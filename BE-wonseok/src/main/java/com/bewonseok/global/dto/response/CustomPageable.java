package com.bewonseok.global.dto.response;

import lombok.Getter;

@Getter
public class CustomPageable {
    private int totalPages;
    private long totalElements;
    private int size;

    public CustomPageable(int totalPages, long totalElements, int size) {
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.size = size;
    }
}
