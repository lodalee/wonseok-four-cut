package com.bewonseok.domain.user.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {
    private String nickname;
    private String email;
    private String userImg;

    public UserResponseDto(String nickname, String email, String userImg) {
        this.nickname = nickname;
        this.email = email;
        this.userImg = userImg;
    }
}
