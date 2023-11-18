package com.bewonseok.global.jwt;

import com.bewonseok.domain.auth.dto.request.LoginRequestDto;
import com.bewonseok.domain.auth.dto.response.LoginResponseDto;
import com.bewonseok.global.dto.response.constant.SuccessMessage;
import com.bewonseok.global.security.UserDetailsImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Date;

@Slf4j(topic = "로그인 및 JWT 생성")
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final JwtUtil jwtUtil;


    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        setFilterProcessesUrl("/user/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        log.info("로그인 시도");
        try {
            LoginRequestDto requestDto = new ObjectMapper().readValue(request.getInputStream(), LoginRequestDto.class);

            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(
                            requestDto.getEmail(),
                            requestDto.getPassword(),
                            null
                    )
            );
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        log.info("로그인 성공 및 JWT 생성");
        UserDetailsImpl userDetails = (UserDetailsImpl) authResult.getPrincipal();
        String email = ((UserDetailsImpl) authResult.getPrincipal()).getUsername();

        String token = jwtUtil.createToken(email);

        // 토큰 만료 시간 가져오기
        Date expirationDate = jwtUtil.getExpirationDateFromToken(token);

        // LoginData 생성
        LoginResponseDto.LoginData loginData = new LoginResponseDto.LoginData(
                token,
                expirationDate
        );

        // LoginResponseDto 생성
        LoginResponseDto loginResponseDto = new LoginResponseDto(
                SuccessMessage.SUCCESS_LOGIN,
                userDetails.getUser().getNickname(),
                email,
                userDetails.getUser().getUserImage(),
                loginData
        );

        // 클라이언트로 토큰을 응답으로 보내주기
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 토큰을 JSON 형식으로 응답 바디에 담기
        String jsonResponse = new ObjectMapper().writeValueAsString(loginResponseDto);
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        log.info("로그인 실패");

        // 클라이언트로 실패 메시지를 응답으로 보내기
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // HTTP 상태 코드 401 - Unauthorized
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 실패 메시지를 JSON 형식으로 응답 바디에 담기
        String jsonResponse = "{\"message\":\"로그인에 실패하였습니다.\"}";
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }
}