package com.bewonseok.domain.board.dto.response;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BoardResponseDto {
    private BoardUserResponseDto user;
    private BoardInfoResponseDto board;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    public BoardResponseDto(
            BoardUserResponseDto user,
            BoardInfoResponseDto board,
            LocalDateTime createdAt,
            LocalDateTime modifiedAt
    ){
        this.user = user;
        this.board = board;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
