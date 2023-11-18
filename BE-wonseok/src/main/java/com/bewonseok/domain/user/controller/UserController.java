package com.bewonseok.domain.user.controller;

import com.bewonseok.domain.user.dto.request.SignupRequestDto;
import com.bewonseok.domain.user.service.UserService;
import com.bewonseok.global.dto.response.CustomResponseDto;
import com.bewonseok.global.dto.response.constant.SuccessMessage;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    @PostMapping("/signup")
    public CustomResponseDto signup(@RequestBody @Valid SignupRequestDto requestDto) {
        userService.signup(requestDto);
        return new CustomResponseDto(SuccessMessage.SIGNUP_SUCCESSFUL, HttpStatus.OK);
    }
}
