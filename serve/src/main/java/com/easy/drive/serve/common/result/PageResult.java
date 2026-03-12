package com.easy.drive.serve.common.result;

import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * 分页响应结果类（符合前端格式）
 * {
 *   list: T[],
 *   total: number
 * }
 */
@Data
public class PageResult<T> implements Serializable {

    private List<T> list;

    private Long total;

    public PageResult() {}

    public PageResult(List<T> list, Long total) {
        this.list = list;
        this.total = total;
    }

    /**
     * 从 MyBatis Plus 的 Page 对象转换
     */
    public static <T> PageResult<T> from(com.baomidou.mybatisplus.extension.plugins.pagination.Page<T> page) {
        if (page == null) {
            return new PageResult<>();
        }
        return new PageResult<>(page.getRecords(), page.getTotal());
    }
}
