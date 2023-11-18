package com.bewonseok.domain.auth.service;

import com.bewonseok.domain.auth.dto.response.UserKakaoResponseDto;
import com.bewonseok.domain.user.entity.User;
import com.bewonseok.domain.user.repository.UserRepository;
import com.bewonseok.global.exception.CustomRuntimeException;
import com.bewonseok.global.exception.constant.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SocialSignInService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User signIn(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<UserKakaoResponseDto> responseEntity;

        try {
            responseEntity = restTemplate.exchange(
                    "https://kapi.kakao.com/v2/user/me",
                    HttpMethod.GET,
                    requestEntity,
                    UserKakaoResponseDto.class
            );
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                throw new CustomRuntimeException(ErrorMessage.BAD_ACCESS_TOKEN, HttpStatus.BAD_REQUEST);
            } else {
                throw new CustomRuntimeException(ErrorMessage.UNABLE_TO_FETCH_ACCESS_TOKEN, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        UserKakaoResponseDto user = responseEntity.getBody();

        if (user == null) {
            throw new CustomRuntimeException(ErrorMessage.UNABLE_TO_FETCH_KAKAO_USER_INFO, HttpStatus.BAD_REQUEST);
        }

        String email = user.getKakao_account().getEmail();

        if (email == null || email.isEmpty()) {
            throw new CustomRuntimeException(ErrorMessage.INVALID_KAKAO_USER, HttpStatus.BAD_REQUEST);
        }

        Optional<User> existingUserOptional = userRepository.findByEmail(email);

        if (!existingUserOptional.isPresent()) {  // 만약 DB에 해당 이메일의 사용자가 없다면 회원 가입 진행
            String nickname = String.valueOf(user.getKakao_account().getProfile().getNickname());
            String userImg = user.getKakao_account().getProfile().getUserImg();

            String password = UUID.randomUUID().toString();  // 임시 비밀번호 생성 (랜덤 UUID)
            String encodedPassword = passwordEncoder.encode(password);  // 비밀번호 암호화

            User newUser = new User(email, nickname, encodedPassword, userImg);
            return userRepository.save(newUser);
        }
        User existingUser = existingUserOptional.get();
        return existingUser;  // 이미 존재하는 유저 정보 반환
    }
}
