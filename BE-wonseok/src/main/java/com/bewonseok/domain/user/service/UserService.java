package com.bewonseok.domain.user.service;

import com.bewonseok.domain.user.dto.request.SignupRequestDto;
import com.bewonseok.domain.user.entity.User;
import com.bewonseok.domain.user.repository.UserRepository;
import com.bewonseok.global.exception.CustomRuntimeException;
import com.bewonseok.global.exception.constant.ErrorMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(SignupRequestDto requestDto){
        String email = requestDto.getEmail();
        String nickname = requestDto.getNickname();
        String password = passwordEncoder.encode(requestDto.getPassword());

        Optional<User> checkNickname = userRepository.findByNickname(nickname);
        if (checkNickname.isPresent()) {
            throw new CustomRuntimeException(ErrorMessage.DUPLICATE_NICKNAME_EXISTS, HttpStatus.CONFLICT);
        }

        Optional<User> checkEmail = userRepository.findByEmail(email);
        if (checkEmail.isPresent()) {

            throw new CustomRuntimeException(ErrorMessage.DUPLICATE_EMAIL_EXISTS, HttpStatus.CONFLICT);
        }

        //사용자 등록
        User user = new User(email, nickname, password, null);
        userRepository.save(user);
    }
}
