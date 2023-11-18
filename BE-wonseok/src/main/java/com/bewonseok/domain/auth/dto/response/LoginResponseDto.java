package com.bewonseok.domain.auth.dto.response;

import com.bewonseok.domain.user.dto.response.UserResponseDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LoginResponseDto {
    private String msg;
    private UserResponseDto user;
    private LoginData data;


    public LoginResponseDto(
            String msg,
            String nickname,
            String email,
            String userImg,
            LoginData data
    ){
        this.msg = msg;
        this.user = new UserResponseDto(nickname, email, userImg);
        this.data = data;
    }

    @Getter
    @Setter
    public static class LoginData{
        private String accessToken;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private Date expirationDate;

        public LoginData(String accessToken,
                         Date expirationDate){
            this.accessToken = accessToken;
            this.expirationDate = expirationDate;
        }
    }
}
