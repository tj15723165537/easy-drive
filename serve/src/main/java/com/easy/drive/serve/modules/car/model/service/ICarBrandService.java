package com.easy.drive.serve.modules.car.model.service;

import com.easy.drive.serve.modules.car.model.dto.CarBrandDTO;
import com.easy.drive.serve.modules.car.model.vo.CarBrandVO;

import java.util.List;

public interface ICarBrandService {
    List<CarBrandVO> getBrandList();

    CarBrandVO getBrandDetail(Long id);

    void createBrand(CarBrandDTO dto);

    void updateBrand(CarBrandDTO dto);

    void deleteBrand(Long id);
}
