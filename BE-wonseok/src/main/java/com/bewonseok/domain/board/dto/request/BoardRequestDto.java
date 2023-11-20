package com.bewonseok.domain.board.dto.request;

import com.bewonseok.global.exception.constant.ErrorMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class BoardRequestDto {
    @NotBlank(message = ErrorMessage.TITLE_NOT_BLANK)
    private String title;

    @NotBlank(message = ErrorMessage.CONTENT_NOT_BLANK)
    private String content;
}
