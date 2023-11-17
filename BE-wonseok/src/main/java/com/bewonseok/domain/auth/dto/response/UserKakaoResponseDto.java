package com.bewonseok.domain.auth.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserKakaoResponseDto {
    private Long id;
    private Properties properties;
    private KakaoAccount kakao_account;
    private String email;

    @Getter
    @Setter
    public static class Properties {
        private String nickname;
        private String userImg;

    }

    @Getter
    @Setter
    public static class KakaoAccount {
        private String email;
        private Profile profile;

        @Getter
        @Setter
        public static class Profile {
            private String nickname;
            private String userImg;
        }
    }
}
