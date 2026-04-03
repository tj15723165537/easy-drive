package com.easy.drive.serve.modules.car.model.controller;

import com.easy.drive.serve.common.result.Result;
import com.easy.drive.serve.modules.car.model.dto.CarModelDTO;
import com.easy.drive.serve.modules.car.model.service.ICarModelService;
import com.easy.drive.serve.modules.car.model.vo.CarModelVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car/model")
@Tag(name = "车型管理", description = "车辆车型的增删改查")
public class CarModelController {

    private final ICarModelService modelService;

    @Autowired
    public CarModelController(@Qualifier("carModelService") ICarModelService modelService) {
        this.modelService = modelService;
    }

    @GetMapping("/list")
    @Operation(summary = "获取车型列表", description = "获取车型列表，可按品牌ID过滤")
    public Result<List<CarModelVO>> getModelList(@Parameter(description = "品牌ID") @RequestParam(required = false) Long brandId) {
        return Result.success(modelService.getModelList(brandId));
    }

    @GetMapping("/tree")
    @Operation(summary = "获取车型树形结构", description = "获取二级树形结构（品牌 → 车型）")
    public Result<?> getModelTree() {
        return Result.success(modelService.getModelTree());
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取车型详情", description = "根据ID获取车型信息")
    public Result<CarModelVO> getModelDetail(@Parameter(description = "车型ID") @PathVariable Long id) {
        return Result.success(modelService.getModelDetail(id));
    }

    @PostMapping
    @Operation(summary = "创建车型", description = "创建新车型")
    public Result<Void> createModel(@Valid @RequestBody CarModelDTO dto) {
        modelService.createModel(dto);
        return Result.success();
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新车型", description = "更新车型信息")
    public Result<Void> updateModel(@Parameter(description = "车型ID") @PathVariable Long id, @Valid @RequestBody CarModelDTO dto) {
        dto.setId(id);
        modelService.updateModel(dto);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除车型", description = "删除车型")
    public Result<Void> deleteModel(@Parameter(description = "车型ID") @PathVariable Long id) {
        modelService.deleteModel(id);
        return Result.success();
    }
}
