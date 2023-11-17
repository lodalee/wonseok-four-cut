package com.bewonseok.global.dto.response;

import org.springframework.http.HttpStatus;

public record CustomResponseDto (String message, HttpStatus status) {
}
