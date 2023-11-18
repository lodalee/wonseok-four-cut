package com.bewonseok.domain.board.controller;

import com.bewonseok.domain.board.dto.request.BoardRequestDto;
import com.bewonseok.domain.board.service.BoardService;
import com.bewonseok.domain.user.entity.User;
import com.bewonseok.global.dto.response.CustomResponseDto;
import com.bewonseok.global.dto.response.constant.SuccessMessage;
import com.bewonseok.global.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    //게시물 등록
    @PostMapping("")
    public CustomResponseDto uploadBoard(
            @RequestPart("board") BoardRequestDto requestDto,
            @RequestPart("photos") List<MultipartFile> images,
            @AuthenticationPrincipal UserDetailsImpl userDetails
            ) throws IOException {

        User user = userDetails.getUser();
        boardService.uploadBoard(requestDto, images, user);
        return new CustomResponseDto(SuccessMessage.BOARD_UPLOAD_SUCCESSFUL, HttpStatus.OK);
    }

    //게시물 수정

    //게시물 삭제

    //게시물 조회

    //게시물 전체 조회

    //게시물 좋아요
}
