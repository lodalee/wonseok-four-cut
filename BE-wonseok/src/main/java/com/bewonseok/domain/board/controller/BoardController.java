package com.bewonseok.domain.board.controller;

import com.bewonseok.domain.board.dto.request.BoardRequestDto;
import com.bewonseok.domain.board.dto.response.BoardResponseDto;
import com.bewonseok.domain.board.dto.response.PageBoardResponseDto;
import com.bewonseok.domain.board.entity.Board;
import com.bewonseok.domain.board.service.BoardService;
import com.bewonseok.domain.user.entity.User;
import com.bewonseok.global.dto.response.CustomResponseDto;
import com.bewonseok.global.dto.response.constant.SuccessMessage;
import com.bewonseok.global.exception.constant.ErrorMessage;
import com.bewonseok.global.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    //게시물 등록
    @PostMapping("")
    public CustomResponseDto uploadBoard(
            @RequestPart("board") BoardRequestDto requestDto,
            @RequestPart("photos") MultipartFile image,
            @AuthenticationPrincipal UserDetailsImpl userDetails
            ){

        try {
            User user = userDetails.getUser();
            if (userDetails == null){
                return new CustomResponseDto(ErrorMessage.LOGIN_REQUIRED, HttpStatus.BAD_REQUEST);
            }
            boardService.uploadBoard(requestDto, image, user);
            return new CustomResponseDto(SuccessMessage.BOARD_UPLOAD_SUCCESSFUL, HttpStatus.OK);
        } catch (Exception e) {
            // 서버 오류 발생 시 처리 로직
            return new CustomResponseDto(ErrorMessage.SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //게시물 수정
    @PatchMapping("/{board_id}")
    public CustomResponseDto updatedBoard(
            @PathVariable Long board_id,
            @RequestBody Board updatedBoard,
            @AuthenticationPrincipal UserDetailsImpl userDetails){

        Long userId = userDetails.getUser().getId();
        return boardService.updatedBoard(board_id, updatedBoard, userId);
    }

    //게시물 삭제
    @DeleteMapping("/{board_id}")
    public CustomResponseDto deleteBoard(
            @PathVariable Long board_id,
            @AuthenticationPrincipal UserDetailsImpl userDetails){

        Long userId = userDetails.getUser().getId();
        return boardService.deleteBoard(board_id, userId);
    }

    //게시물 조회
    @GetMapping("/{board_id}")
    public BoardResponseDto getOneBoard(
            @PathVariable Long board_id){
        return boardService.getOneBoard(board_id);
    }

    //게시물 전체 조회
    @GetMapping("")
    public PageBoardResponseDto getBoards(
            @RequestParam int page,
            @RequestParam("limit") int size

    ){
        return boardService.getBoards(page-1, size);
    }

    //게시물 좋아요
}
