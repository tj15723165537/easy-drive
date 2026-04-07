package com.easy.drive.serve.modules.car.model.vo;

import lombok.Data;
import java.util.List;

@Data
public class CarModelTreeVO {
    private Long value;
    private String label;
    private List<CarModelChildVO> children;

    @Data
    public static class CarModelChildVO {
        private Long value;
        private String label;
    }
}
