package com.bewonseok.domain.board.service;

import com.bewonseok.domain.board.dto.request.BoardRequestDto;
import com.bewonseok.domain.board.entity.Board;
import com.bewonseok.domain.board.entity.BoardImg;
import com.bewonseok.domain.board.repository.BoardImgRepository;
import com.bewonseok.domain.board.repository.BoardRepository;
import com.bewonseok.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardImgRepository boardImgRepository;
    private final BoardImageService boardImageService;

    //게시물 등록
    public void uploadBoard(
            BoardRequestDto requestDto,
            List<MultipartFile> images,
            User user) throws IOException {

        List<BoardImg> boardImgs = null;
        if (images != null && !images.isEmpty()){
            boardImgs = boardImageService.uploadImagesToS3AndCreateBoardImages(images);
        }

        Board board = new Board(requestDto, user);
        boardRepository.save(board);

        if (boardImgs !=null){
            associateBoardImagesWithBoard(board, boardImgs);
        }
    }

    private void associateBoardImagesWithBoard(Board board, List<BoardImg> boardImgs) {
        for (BoardImg boardImg : boardImgs){
            boardImg.setBoard(board);
            boardImgRepository.save(boardImg);
        }
    }

    //게시물 수정

    //게시물 삭제

    //게시물 조회

    //게시물 전체 조회
}
