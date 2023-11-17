package com.bewonseok.global.exception;

import org.springframework.http.HttpStatus;

public class CustomRuntimeException extends RuntimeException {

    private HttpStatus httpStatus;
    public CustomRuntimeException(String message, HttpStatus status){
        super(message);
        this.httpStatus = status;
    }

    public HttpStatus getHttpStatus(){
        return httpStatus;
    }
}
