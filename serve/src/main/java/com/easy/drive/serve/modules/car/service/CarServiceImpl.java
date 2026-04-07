package com.easy.drive.serve.modules.car.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.easy.drive.serve.common.constant.ResultCode;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.modules.auth.mapper.UserMapper;
import com.easy.drive.serve.modules.car.dto.CarCreateDTO;
import com.easy.drive.serve.modules.car.dto.CarSearchDTO;
import com.easy.drive.serve.modules.car.dto.CarUpdateDTO;
import com.easy.drive.serve.modules.car.entity.Car;
import com.easy.drive.serve.modules.car.mapper.CarMapper;
import com.easy.drive.serve.modules.car.model.entity.CarBrand;
import com.easy.drive.serve.modules.car.model.entity.CarModel;
import com.easy.drive.serve.modules.car.model.mapper.CarBrandMapper;
import com.easy.drive.serve.modules.car.model.mapper.CarModelMapper;
import com.easy.drive.serve.modules.car.vo.CarInfoVO;
import com.easy.drive.serve.modules.car.vo.CarPageVO;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@org.springframework.context.annotation.Primary
public class CarServiceImpl implements ICarService {

    @Resource
    private CarMapper carMapper;

    @Resource
    private UserMapper userMapper;

    @Resource
    private CarBrandMapper carBrandMapper;

    @Resource
    private CarModelMapper carModelMapper;

    @Override
    public Long createCar(CarCreateDTO dto, Long userId) {
        Car car = new Car();

        // 根据 brandId 查询 brandName
        if (dto.getBrandId() != null) {
            CarBrand brand = carBrandMapper.selectById(dto.getBrandId());
            if (brand != null) {
                car.setBrandName(brand.getName());
            }
            car.setBrandId(dto.getBrandId());
        }

        // 根据 modelId 查询 modelName
        if (dto.getModelId() != null) {
            CarModel model = carModelMapper.selectById(dto.getModelId());
            if (model != null) {
                car.setModelName(model.getName());
            }
            car.setModelId(dto.getModelId());
        }

        car.setPrice(dto.getPrice());
        car.setMileage(dto.getMileage());
        car.setYear(dto.getYear());
        car.setFuelType(dto.getFuelType());
        car.setTransmission(dto.getTransmission());
        car.setDescription(dto.getDescription());
        car.setImages(dto.getImages());
        car.setPickupLocation(dto.getPickupLocation());
        car.setUserId(userId);
        car.setStatus(dto.getStatus() != null ? dto.getStatus() : 1);
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

        // 根据 brandId 查询 brandName
        if (dto.getBrandId() != null) {
            CarBrand brand = carBrandMapper.selectById(dto.getBrandId());
            if (brand != null) {
                car.setBrandName(brand.getName());
            }
        }

        // 根据 modelId 查询 modelName
        if (dto.getModelId() != null) {
            CarModel model = carModelMapper.selectById(dto.getModelId());
            if (model != null) {
                car.setModelName(model.getName());
            }
        }

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
    public CarPageVO searchCars(CarSearchDTO searchDTO) {
        int pageNum = searchDTO.getPageNum() != null ? searchDTO.getPageNum() : 1;
        int pageSize = searchDTO.getPageSize() != null ? searchDTO.getPageSize() : 10;

        Page<Car> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Car> wrapper = new LambdaQueryWrapper<>();

        if (searchDTO.getBrandId() != null) {
            wrapper.like(Car::getBrandId, searchDTO.getBrandId());
        }
        if (searchDTO.getModelId() != null) {
            wrapper.like(Car::getModelId, searchDTO.getModelId());
        }
        if (searchDTO.getYear() != null) {
            wrapper.eq(Car::getYear, searchDTO.getYear());
        }
        if (searchDTO.getStatus() != null) {
            wrapper.eq(Car::getStatus, searchDTO.getStatus());
        } else {
            wrapper.eq(Car::getStatus, 1);
        }

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

        // 处理图片列表，避免空字符串导致问题
        String images = car.getImages();
        List<String> imageList = new java.util.ArrayList<>();
        if (images != null && !images.isEmpty()) {
            imageList = Arrays.asList(images.split(","))
                    .stream()
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }
        vo.setImageList(imageList);

        // 根据 userId 查询用户名
        if (car.getUserId() != null) {
            String username = userMapper.getUsernameById(car.getUserId());
            vo.setUsername(username);
        }

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
