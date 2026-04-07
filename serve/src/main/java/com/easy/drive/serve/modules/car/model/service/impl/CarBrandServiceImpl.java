package com.easy.drive.serve.modules.car.model.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.modules.car.model.dto.CarBrandDTO;
import com.easy.drive.serve.modules.car.model.entity.CarBrand;
import com.easy.drive.serve.modules.car.model.mapper.CarBrandMapper;
import com.easy.drive.serve.modules.car.model.mapper.CarModelMapper;
import com.easy.drive.serve.modules.car.model.service.ICarBrandService;
import com.easy.drive.serve.modules.car.model.service.ICarModelService;
import com.easy.drive.serve.modules.car.model.vo.CarBrandVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service("carBrandService")
public class CarBrandServiceImpl implements ICarBrandService {

    private final CarBrandMapper brandMapper;
    private final CarModelMapper modelMapper;
    private final ICarModelService carModelService;

    @Autowired
    public CarBrandServiceImpl(
            CarBrandMapper brandMapper,
            CarModelMapper modelMapper,
            @Qualifier("carModelService") ICarModelService carModelService) {
        this.brandMapper = brandMapper;
        this.modelMapper = modelMapper;
        this.carModelService = carModelService;
    }

    @Override
    public List<CarBrandVO> getBrandList() {
        LambdaQueryWrapper<CarBrand> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(CarBrand::getSort).orderByDesc(CarBrand::getCreateTime);
        List<CarBrand> brands = brandMapper.selectList(wrapper);
        return brands.stream().map(this::toVO).collect(Collectors.toList());
    }

    @Override
    public CarBrandVO getBrandDetail(Long id) {
        CarBrand brand = brandMapper.selectById(id);
        if (brand == null) {
            throw new BusinessException("品牌不存在");
        }
        return toVO(brand);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createBrand(CarBrandDTO dto) {
        CarBrand brand = new CarBrand();
        BeanUtils.copyProperties(dto, brand);
        brandMapper.insert(brand);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateBrand(CarBrandDTO dto) {
        if (dto.getId() == null) {
            throw new BusinessException("品牌ID不能为空");
        }
        CarBrand brand = brandMapper.selectById(dto.getId());
        if (brand == null) {
            throw new BusinessException("品牌不存在");
        }
        BeanUtils.copyProperties(dto, brand, "id", "createTime", "updateTime", "deleted");
        brandMapper.updateById(brand);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteBrand(Long id) {
        CarBrand brand = brandMapper.selectById(id);
        if (brand == null) {
            throw new BusinessException("品牌不存在");
        }
        // 级联删除下属车型
        carModelService.deleteModelsByBrandId(id);
        brandMapper.deleteById(id);
    }

    private CarBrandVO toVO(CarBrand brand) {
        CarBrandVO vo = new CarBrandVO();
        BeanUtils.copyProperties(brand, vo);
        return vo;
    }
}
