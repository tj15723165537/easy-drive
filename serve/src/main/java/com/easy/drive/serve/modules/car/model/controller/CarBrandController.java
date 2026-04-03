package com.easy.drive.serve.modules.car.model.controller;

import com.easy.drive.serve.common.result.Result;
import com.easy.drive.serve.modules.car.model.dto.CarBrandDTO;
import com.easy.drive.serve.modules.car.model.service.ICarBrandService;
import com.easy.drive.serve.modules.car.model.vo.CarBrandVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car/brand")
@Tag(name = "品牌管理", description = "车辆品牌的增删改查")
public class CarBrandController {

    private final ICarBrandService brandService;

    @Autowired
    public CarBrandController(@Qualifier("carBrandService") ICarBrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/list")
    @Operation(summary = "获取品牌列表", description = "获取所有品牌")
    public Result<List<CarBrandVO>> getBrandList() {
        return Result.success(brandService.getBrandList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取品牌详情", description = "根据ID获取品牌信息")
    public Result<CarBrandVO> getBrandDetail(@Parameter(description = "品牌ID") @PathVariable Long id) {
        return Result.success(brandService.getBrandDetail(id));
    }

    @PostMapping
    @Operation(summary = "创建品牌", description = "创建新品牌")
    public Result<Void> createBrand(@Valid @RequestBody CarBrandDTO dto) {
        brandService.createBrand(dto);
        return Result.success();
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新品牌", description = "更新品牌信息")
    public Result<Void> updateBrand(@Parameter(description = "品牌ID") @PathVariable Long id, @Valid @RequestBody CarBrandDTO dto) {
        dto.setId(id);
        brandService.updateBrand(dto);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除品牌", description = "删除品牌（含级联删除车型）")
    public Result<Void> deleteBrand(@Parameter(description = "品牌ID") @PathVariable Long id) {
        brandService.deleteBrand(id);
        return Result.success();
    }
}
