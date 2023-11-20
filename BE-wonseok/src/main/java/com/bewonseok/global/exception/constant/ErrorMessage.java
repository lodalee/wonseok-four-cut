package com.bewonseok.global.exception.constant;

public class ErrorMessage {
    //auth - badRequest + serverError
    public static final String INVALID_AUTH_CODE = "유효하지 않은 인증 코드입니다.";
    public static final String UNABLE_TO_FETCH_ACCESS_TOKEN = "액세스 토큰을 가져올 수 없습니다.";
    public static final String BAD_AUTH_CODE = "잘못된 인증 코드 입니다.";
    public static final String UNABLE_TO_FETCH_KAKAO_USER_INFO = "카카오 유저 정보를 가져올 수 없습니다.";
    public static final String BAD_ACCESS_TOKEN = "잘못된 Access token 입니다.";
    public static final String INVALID_KAKAO_USER = "유효하지 않은 카카오 유저입니다. 이메일 정보가 없습니다.";
    public static final String SERVER_ERROR = "서버에 문제가 발생했습니다.";

    //conflict
    public static final String DUPLICATE_NICKNAME_EXISTS = "중복된 닉네임이 존재합니다.";
    public static final String DUPLICATE_EMAIL_EXISTS = "중복된 이메일이 존재합니다.";

    //notFound
    public static final String BOARD_NOT_FOUND = "존재하지 않는 게시글 입니다.";

    //signup - badRequest
    public static final String EMAIL_NOT_BLANK = "이메일을 입력해주세요.";
    public static final String INVALID_EMAIL_LENGTH = "이메일은 최소 12자 이상, 최대 30자 미만으로 입력해야합니다.";
    public static final String INVALID_EMAIL_FORMAT = "잘못된 이메일 형식입니다.";
    public static final String NICKNAME_NOT_BLANK = "닉네임을 입력해주세요.";
    public static final String INVALID_NICKNAME_LENGTH = "닉네임은 최대 8자까지 입력해야합니다.";
    public static final String INVALID_NICKNAME_FORMAT = "닉네임에 특수기호를 입력할 수 없습니다.";
    public static final String PASSWORD_NOT_BLANK = "비밀번호를 입력해주세요.";
    public static final String INVALID_PASSWORD_LENGTH = "비밀번호는 최소 8자 이상, 최대 20자 미만으로 입력해야합니다.";
    public static final String INVALID_PASSWORD_FORMAT = "잘못된 비밀번호 형식입니다. 소문자, 대문자, 특수기호를 각각 하나 이상 입력해주세요.";

    //user
    public static final String LOGIN_REQUIRED ="로그인 후에 이용 가능합니다." ;

    //Board
    public static final String TITLE_NOT_BLANK = "제목을 입력해주세요.";
    public static final String CONTENT_NOT_BLANK = "내용을 입력해주세요.";
    public static final String NOT_POST_OWNER = "게시글의 작성자가 아닙니다.";
}
