package com.easy.drive.serve.modules.car.model.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.modules.car.model.dto.CarModelDTO;
import com.easy.drive.serve.modules.car.model.entity.CarBrand;
import com.easy.drive.serve.modules.car.model.entity.CarModel;
import com.easy.drive.serve.modules.car.model.mapper.CarBrandMapper;
import com.easy.drive.serve.modules.car.model.mapper.CarModelMapper;
import com.easy.drive.serve.modules.car.model.service.ICarModelService;
import com.easy.drive.serve.modules.car.model.vo.CarModelTreeVO;
import com.easy.drive.serve.modules.car.model.vo.CarModelVO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("carModelService")
public class CarModelServiceImpl implements ICarModelService {

    private final CarModelMapper modelMapper;
    private final CarBrandMapper brandMapper;

    public CarModelServiceImpl(CarModelMapper modelMapper, CarBrandMapper brandMapper) {
        this.modelMapper = modelMapper;
        this.brandMapper = brandMapper;
    }

    @Override
    public List<CarModelVO> getModelList(Long brandId) {
        LambdaQueryWrapper<CarModel> wrapper = new LambdaQueryWrapper<>();
        if (brandId != null) {
            wrapper.eq(CarModel::getBrandId, brandId);
        }
        wrapper.orderByAsc(CarModel::getSort).orderByDesc(CarModel::getCreateTime);
        List<CarModel> models = modelMapper.selectList(wrapper);

        // 填充品牌名称
        List<CarModelVO> vos = new ArrayList<>();
        for (CarModel model : models) {
            CarModelVO vo = toVO(model);
            CarBrand brand = brandMapper.selectById(model.getBrandId());
            if (brand != null) {
                vo.setBrandName(brand.getName());
            }
            vos.add(vo);
        }
        return vos;
    }

    @Override
    public List<CarModelTreeVO> getModelTree() {
        // 获取所有品牌
        LambdaQueryWrapper<CarBrand> brandWrapper = new LambdaQueryWrapper<>();
        brandWrapper.orderByAsc(CarBrand::getSort).orderByAsc(CarBrand::getName);
        List<CarBrand> brands = brandMapper.selectList(brandWrapper);

        // 获取所有车型
        LambdaQueryWrapper<CarModel> modelWrapper = new LambdaQueryWrapper<>();
        modelWrapper.orderByAsc(CarModel::getSort).orderByAsc(CarModel::getName);
        List<CarModel> allModels = modelMapper.selectList(modelWrapper);

        // 按品牌分组
        return brands.stream().map(brand -> {
            CarModelTreeVO treeVO = new CarModelTreeVO();
            treeVO.setValue(brand.getId());
            treeVO.setLabel(brand.getName());

            List<CarModel> brandModels = allModels.stream()
                    .filter(m -> m.getBrandId().equals(brand.getId()))
                    .collect(Collectors.toList());

            List<CarModelTreeVO.CarModelChildVO> children = brandModels.stream()
                    .map(m -> {
                        CarModelTreeVO.CarModelChildVO child = new CarModelTreeVO.CarModelChildVO();
                        child.setValue(m.getId());
                        child.setLabel(m.getName());
                        return child;
                    })
                    .collect(Collectors.toList());

            treeVO.setChildren(children);
            return treeVO;
        }).collect(Collectors.toList());
    }

    @Override
    public CarModelVO getModelDetail(Long id) {
        CarModel model = modelMapper.selectById(id);
        if (model == null) {
            throw new BusinessException("车型不存在");
        }
        CarModelVO vo = toVO(model);
        CarBrand brand = brandMapper.selectById(model.getBrandId());
        if (brand != null) {
            vo.setBrandName(brand.getName());
        }
        return vo;
    }

    @Override
    public void createModel(CarModelDTO dto) {
        // 验证品牌存在
        CarBrand brand = brandMapper.selectById(dto.getBrandId());
        if (brand == null) {
            throw new BusinessException("品牌不存在");
        }
        CarModel model = new CarModel();
        BeanUtils.copyProperties(dto, model);
        modelMapper.insert(model);
    }

    @Override
    public void updateModel(CarModelDTO dto) {
        if (dto.getId() == null) {
            throw new BusinessException("车型ID不能为空");
        }
        CarModel model = modelMapper.selectById(dto.getId());
        if (model == null) {
            throw new BusinessException("车型不存在");
        }
        // 验证品牌存在
        CarBrand brand = brandMapper.selectById(dto.getBrandId());
        if (brand == null) {
            throw new BusinessException("品牌不存在");
        }
        BeanUtils.copyProperties(dto, model, "id", "createTime", "updateTime", "deleted");
        modelMapper.updateById(model);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteModel(Long id) {
        CarModel model = modelMapper.selectById(id);
        if (model == null) {
            throw new BusinessException("车型不存在");
        }
        modelMapper.deleteById(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteModelsByBrandId(Long brandId) {
        LambdaUpdateWrapper<CarModel> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(CarModel::getBrandId, brandId);
        modelMapper.delete(wrapper);
    }

    private CarModelVO toVO(CarModel model) {
        CarModelVO vo = new CarModelVO();
        BeanUtils.copyProperties(model, vo);
        return vo;
    }
}
