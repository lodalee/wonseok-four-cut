package com.bewonseok.domain.board.dto.response;

import lombok.Getter;

@Getter
public class BoardInfoResponseDto {
    private Long boardId;
    private String title;
    private String content;
    private String boardImg;

    public BoardInfoResponseDto(Long boardId, String title, String content, String boardImg) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
        this.boardImg = boardImg;
    }
}
