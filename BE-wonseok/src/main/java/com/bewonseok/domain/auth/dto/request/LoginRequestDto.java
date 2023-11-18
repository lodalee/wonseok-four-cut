package com.bewonseok.domain.auth.dto.request;

import com.bewonseok.global.exception.constant.ErrorMessage;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    @NotBlank(message = ErrorMessage.EMAIL_NOT_BLANK)
    @Size(min = 12, max = 30, message = ErrorMessage.INVALID_EMAIL_LENGTH)
    @Email(message = ErrorMessage.INVALID_EMAIL_FORMAT)
    private String email;

    @NotBlank(message = ErrorMessage.PASSWORD_NOT_BLANK)
    @Size(min = 4, max = 20, message = ErrorMessage.INVALID_PASSWORD_LENGTH)
    //@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^<>&*]).*$", message = ErrorMessage.INVALID_PASSWORD_FORMAT)
    private String password;
}
