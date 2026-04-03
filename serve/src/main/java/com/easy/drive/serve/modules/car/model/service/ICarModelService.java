package com.easy.drive.serve.modules.car.model.service;

import com.easy.drive.serve.modules.car.model.dto.CarModelDTO;
import com.easy.drive.serve.modules.car.model.vo.CarModelTreeVO;
import com.easy.drive.serve.modules.car.model.vo.CarModelVO;

import java.util.List;

public interface ICarModelService {
    List<CarModelVO> getModelList(Long brandId);

    List<CarModelTreeVO> getModelTree();

    CarModelVO getModelDetail(Long id);

    void createModel(CarModelDTO dto);

    void updateModel(CarModelDTO dto);

    void deleteModel(Long id);

    void deleteModelsByBrandId(Long brandId);
}
