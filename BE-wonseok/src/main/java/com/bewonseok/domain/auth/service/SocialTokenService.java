package com.bewonseok.domain.auth.service;

import com.bewonseok.global.exception.CustomRuntimeException;
import com.bewonseok.global.exception.constant.ErrorMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@Service
public class SocialTokenService {
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoRedirectUri;

    public String getAccessToken(String authCode) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        String grantType = "authorization_code";

        URI uri = UriComponentsBuilder.fromHttpUrl("https://kauth.kakao.com/oauth/token")
                .queryParam("grant_type", grantType)
                .queryParam("client_id", kakaoClientId)
                .queryParam("redirect_uri", kakaoRedirectUri)
                .queryParam("code", authCode)
                .build()
                .encode()
                .toUri();

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                uri,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<>() {
                });


        //정상적으로 ;authCode; 를 받아왔을 때 - Ok
        //클라이언트가 잘못된 'authCode' 를 제공한 경우 - Bad Request
        //서버측의 문제로 토큰을 받아오지 못한 경우 - Internal Sever Error
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            if (responseEntity.getBody() != null && responseEntity.getBody().containsKey("access_token")) {
                return responseEntity.getBody().get("access_token").toString();

            }
        } else if (responseEntity.getStatusCode() == HttpStatus.BAD_REQUEST) {
            throw new CustomRuntimeException(ErrorMessage.BAD_AUTH_CODE, HttpStatus.BAD_REQUEST);
        }
        throw new CustomRuntimeException(ErrorMessage.UNABLE_TO_FETCH_ACCESS_TOKEN, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

