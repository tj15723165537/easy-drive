package com.easy.drive.serve.modules.car;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.easy.drive.serve.modules.car.dto.CarCreateDTO;
import com.easy.drive.serve.modules.car.dto.CarUpdateDTO;
import com.easy.drive.serve.modules.car.vo.CarInfoVO;
import com.easy.drive.serve.modules.car.vo.CarPageVO;

import java.math.BigDecimal;

public interface ICarService {

    Long createCar(CarCreateDTO dto, Long userId);

    void updateCar(Long id, CarUpdateDTO dto, Long userId);

    void deleteCar(Long id, Long userId);

    CarInfoVO getCarById(Long id);

    CarPageVO searchCars(Integer pageNum, Integer pageSize, String brand, String model,
                       BigDecimal minPrice, BigDecimal maxPrice, Integer year);

    CarPageVO getMyCars(Integer pageNum, Integer pageSize, Long userId);
}
