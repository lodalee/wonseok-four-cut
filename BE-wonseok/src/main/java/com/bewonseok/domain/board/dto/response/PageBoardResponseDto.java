package com.bewonseok.domain.board.dto.response;

import com.bewonseok.global.dto.response.CustomPageable;
import lombok.Getter;

import java.util.List;

@Getter
public class PageBoardResponseDto {
    private String msg;
    private CustomPageable pageable;
    private List<BoardResponseDto> result;

    public PageBoardResponseDto(
            String msg,
            int totalPages,
            long totalElements,
            int size,
            List<BoardResponseDto> BoardResponseDto
    ){
        this.msg = msg;
        this.pageable = new CustomPageable(totalPages, totalElements, size);
        this.result = BoardResponseDto;
    }
}
