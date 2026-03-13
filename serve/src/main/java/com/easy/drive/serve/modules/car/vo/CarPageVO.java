package com.easy.drive.serve.modules.car.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "车辆分页响应")
public class CarPageVO {
    @Schema(description = "总记录数", example = "100")
    private Long total;

    @Schema(description = "车辆列表")
    private List<CarInfoVO> list;
}
