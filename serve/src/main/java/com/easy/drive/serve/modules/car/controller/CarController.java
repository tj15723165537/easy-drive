package com.easy.drive.serve.modules.car.controller;

import com.easy.drive.serve.common.result.Result;
import com.easy.drive.serve.modules.car.dto.CarCreateDTO;
import com.easy.drive.serve.modules.car.dto.CarSearchDTO;
import com.easy.drive.serve.modules.car.dto.CarUpdateDTO;
import com.easy.drive.serve.modules.car.service.ICarService;
import com.easy.drive.serve.modules.car.vo.CarInfoVO;
import com.easy.drive.serve.modules.car.vo.CarPageVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cars")
@Tag(name = "车辆管理", description = "车辆的增删改查和搜索")
public class CarController {

    @Autowired
    private ICarService carService;

    @PostMapping
    @Operation(summary = "创建车辆", description = "发布新的二手车信息")
    public Result<Long> createCar(@Valid @RequestBody CarCreateDTO dto, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        Long carId = carService.createCar(dto, userId);
        return Result.success(carId);
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新车辆", description = "更新车辆信息，只有发布者可修改")
    public Result<Void> updateCar(@PathVariable Long id, @Valid @RequestBody CarUpdateDTO dto, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        carService.updateCar(id, dto, userId);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除车辆", description = "删除车辆，只有发布者可删除")
    public Result<Void> deleteCar(@PathVariable Long id, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        carService.deleteCar(id, userId);
        return Result.success();
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取车辆详情", description = "根据ID获取车辆详细信息")
    public Result<CarInfoVO> getCarById(@PathVariable Long id) {
        CarInfoVO car = carService.getCarById(id);
        return Result.success(car);
    }

    @GetMapping("/search")
    @Operation(summary = "搜索车辆", description = "根据品牌、年份等条件搜索车辆")
    public Result<CarPageVO> searchCars(CarSearchDTO searchDTO) {
        CarPageVO page = carService.searchCars(searchDTO);
        return Result.success(page);
    }

    @GetMapping("/my")
    @Operation(summary = "获取我的车辆", description = "获取当前用户发布的所有车辆")
    public Result<CarPageVO> getMyCars(
            @Parameter(description = "页码", example = "1") @RequestParam(defaultValue = "1") Integer pageNum,
            @Parameter(description = "每页大小", example = "10") @RequestParam(defaultValue = "10") Integer pageSize,
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        CarPageVO page = carService.getMyCars(pageNum, pageSize, userId);
        return Result.success(page);
    }
}
