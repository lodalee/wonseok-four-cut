package com.bewonseok.domain.auth.controller;

import com.bewonseok.domain.auth.dto.request.SocialAuthCodeRequestDto;
import com.bewonseok.domain.auth.dto.response.LoginResponseDto;
import com.bewonseok.domain.auth.service.SocialSignInService;
import com.bewonseok.domain.auth.service.SocialTokenService;
import com.bewonseok.domain.user.entity.User;
import com.bewonseok.global.dto.response.constant.SuccessMessage;
import com.bewonseok.global.exception.CustomRuntimeException;
import com.bewonseok.global.exception.constant.ErrorMessage;
import com.bewonseok.global.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/kakao")
public class SocialController {

    private final SocialTokenService socialTokenService;
    private final SocialSignInService socialSignInService;
    private final JwtUtil jwtUtil;

    //프론트 - kakao로 인가코드 요청해서 받아옴
    //프론트 -> 서버로 인가코드 전송
    //서버 - 인가코드 받아와서 유효성 검사
    @PostMapping("")
    public ResponseEntity<LoginResponseDto> signInWithKakao(
            @RequestBody SocialAuthCodeRequestDto authCodeRequestDto) {

        String authCode = authCodeRequestDto.getCode();

        if (authCode == null || authCode.isEmpty()) {
            throw new CustomRuntimeException(ErrorMessage.INVALID_AUTH_CODE, HttpStatus.BAD_REQUEST);
            //'400 Bad Request'는 서버가 클라이언트의 요청을 이해하지 못했을 때 반환하는 상태 코드입니다.
            //요청이 부적절하거나, 요청에 필요한 인자가 누락되었거나, 요청에 포함된 데이터 형식이 잘못된 경우에 이 코드가 사용됩니다.
        }

        String accessToken = socialTokenService.getAccessToken(authCode);

        User user = socialSignInService.signIn(accessToken);

        return processSocialLogin(user, SuccessMessage.SUCCESS_KAKAO_LOGIN);
    }

    private ResponseEntity<LoginResponseDto> processSocialLogin(User user, String successMessage) {
        // 액세스 토큰 생성
        String customAccessToken = jwtUtil.createToken(user.getEmail());

        // 액세스 토큰의 만료 시간 가져오기
        Date expirationDate = jwtUtil.getExpirationDateFromToken(customAccessToken);

        // LoginData 생성
        LoginResponseDto.LoginData loginData = new LoginResponseDto.LoginData(
                customAccessToken,
                expirationDate
        );

        // SocialLoginResponseDto 생성
        LoginResponseDto loginResponseDto = new LoginResponseDto(
                successMessage,
                user.getNickname(),
                user.getEmail(),
                user.getUserImage(),
                loginData
        );

        return ResponseEntity.ok(loginResponseDto);
    }
}
