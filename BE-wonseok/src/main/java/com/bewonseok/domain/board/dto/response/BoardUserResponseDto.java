package com.bewonseok.domain.board.dto.response;

import lombok.Getter;

@Getter
public class BoardUserResponseDto {
    private Long userId;
    private String userImg;

    public BoardUserResponseDto(Long userId, String userImg){
        this.userId = userId;
        this.userImg = userImg;
    }
}
