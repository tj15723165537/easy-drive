package com.easy.drive.serve.modules.car.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.easy.drive.serve.modules.car.dto.CarCreateDTO;
import com.easy.drive.serve.modules.car.dto.CarSearchDTO;
import com.easy.drive.serve.modules.car.dto.CarUpdateDTO;
import com.easy.drive.serve.modules.car.vo.CarInfoVO;
import com.easy.drive.serve.modules.car.vo.CarPageVO;

public interface ICarService {

    Long createCar(CarCreateDTO dto, Long userId);

    void updateCar(Long id, CarUpdateDTO dto, Long userId);

    void deleteCar(Long id, Long userId);

    CarInfoVO getCarById(Long id);

    CarPageVO searchCars(CarSearchDTO searchDTO);

    CarPageVO getMyCars(Integer pageNum, Integer pageSize, Long userId);
}
