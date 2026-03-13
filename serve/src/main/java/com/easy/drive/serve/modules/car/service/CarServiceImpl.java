package com.easy.drive.serve.modules.car.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.easy.drive.serve.common.constant.ResultCode;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.modules.car.dto.CarCreateDTO;
import com.easy.drive.serve.modules.car.dto.CarUpdateDTO;
import com.easy.drive.serve.modules.car.entity.Car;
import com.easy.drive.serve.modules.car.mapper.CarMapper;
import com.easy.drive.serve.modules.car.vo.CarInfoVO;
import com.easy.drive.serve.modules.car.vo.CarPageVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@org.springframework.context.annotation.Primary
public class CarServiceImpl implements ICarService {

    @Autowired
    private CarMapper carMapper;

    @Override
    public Long createCar(CarCreateDTO dto, Long userId) {
        Car car = new Car();
        BeanUtils.copyProperties(dto, car);
        car.setUserId(userId);
        car.setStatus(1);
        carMapper.insert(car);
        return car.getId();
    }

    @Override
    public void updateCar(Long id, CarUpdateDTO dto, Long userId) {
        Car existCar = carMapper.selectById(id);
        if (existCar == null) {
            throw new BusinessException(ResultCode.CAR_NOT_EXIST);
        }
        if (!existCar.getUserId().equals(userId)) {
            throw new BusinessException("无权限修改此车辆");
        }
        
        Car car = new Car();
        BeanUtils.copyProperties(dto, car);
        car.setId(id);
        car.setUserId(userId);
        carMapper.updateById(car);
    }

    @Override
    public void deleteCar(Long id, Long userId) {
        Car existCar = carMapper.selectById(id);
        if (existCar == null) {
            throw new BusinessException(ResultCode.CAR_NOT_EXIST);
        }
        if (!existCar.getUserId().equals(userId)) {
            throw new BusinessException("无权限删除此车辆");
        }
        carMapper.deleteById(id);
    }

    @Override
    public CarInfoVO getCarById(Long id) {
        Car car = carMapper.selectById(id);
        if (car == null) {
            throw new BusinessException(ResultCode.CAR_NOT_EXIST);
        }
        return convertToVO(car);
    }

    @Override
    public CarPageVO searchCars(Integer pageNum, Integer pageSize, String brand, String model,
                                BigDecimal minPrice, BigDecimal maxPrice, Integer year) {
        Page<Car> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Car> wrapper = new LambdaQueryWrapper<>();

        if (brand != null && !brand.isEmpty()) {
            wrapper.like(Car::getBrand, brand);
        }
        if (model != null && !model.isEmpty()) {
            wrapper.like(Car::getModel, model);
        }
        if (minPrice != null) {
            wrapper.ge(Car::getPrice, minPrice);
        }
        if (maxPrice != null) {
            wrapper.le(Car::getPrice, maxPrice);
        }
        if (year != null) {
            wrapper.eq(Car::getYear, year);
        }

        wrapper.eq(Car::getStatus, 1);
        wrapper.orderByDesc(Car::getCreateTime);

        Page<Car> carPage = carMapper.selectPage(page, wrapper);
        return convertToPageVO(carPage);
    }

    @Override
    public CarPageVO getMyCars(Integer pageNum, Integer pageSize, Long userId) {
        Page<Car> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Car> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Car::getUserId, userId);
        wrapper.orderByDesc(Car::getCreateTime);
        Page<Car> carPage = carMapper.selectPage(page, wrapper);
        return convertToPageVO(carPage);
    }

    private CarInfoVO convertToVO(Car car) {
        CarInfoVO vo = new CarInfoVO();
        BeanUtils.copyProperties(car, vo);
        
        List<String> imageList = Arrays.asList(car.getImages().split(","))
                .stream()
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
        vo.setImageList(imageList);
        
        return vo;
    }

    private CarPageVO convertToPageVO(Page<Car> carPage) {
        CarPageVO pageVO = new CarPageVO();
        pageVO.setTotal(carPage.getTotal());

        List<CarInfoVO> records = carPage.getRecords()
                .stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
        pageVO.setList(records);
        
        return pageVO;
    }
}
