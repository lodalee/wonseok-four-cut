package com.bewonseok.global.exception;

import com.bewonseok.global.dto.response.CustomResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({CustomRuntimeException.class})
    public ResponseEntity<CustomResponseDto> handleException(CustomRuntimeException ex) {
        CustomResponseDto restApiException = new CustomResponseDto(ex.getMessage(), ex.getHttpStatus());
        return new ResponseEntity<>(
                // HTTP body
                restApiException,
                // HTTP status code
                ex.getHttpStatus()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CustomResponseDto> handleValidationException(MethodArgumentNotValidException ex) {
        // 유효성 검증이 실패한 필드 중 첫 번째 필드의 에러 메시지를 가져옵니다.
        String errorMessage = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();

        CustomResponseDto response = new CustomResponseDto(errorMessage, HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(
                // HTTP body
                response,
                // HTTP status code
                HttpStatus.BAD_REQUEST
        );
    }
}
