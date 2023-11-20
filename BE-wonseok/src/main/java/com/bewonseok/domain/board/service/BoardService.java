package com.bewonseok.domain.board.service;

import com.bewonseok.domain.board.dto.request.BoardRequestDto;
import com.bewonseok.domain.board.entity.Board;
import com.bewonseok.domain.board.repository.BoardRepository;
import com.bewonseok.domain.user.entity.User;
import com.bewonseok.global.dto.response.CustomResponseDto;
import com.bewonseok.global.dto.response.constant.SuccessMessage;
import com.bewonseok.global.exception.CustomRuntimeException;
import com.bewonseok.global.exception.constant.ErrorMessage;
import com.bewonseok.global.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardImageService boardImageService;
    private final S3Service s3Service;

    // 게시물 등록
    public void uploadBoard(BoardRequestDto requestDto, MultipartFile image, User user) throws IOException {
        String boardImg = boardImageService.uploadImageToS3AndCreateBoardImage(image);
        Board board = new Board(requestDto, user, boardImg);
        boardRepository.save(board);
    }

    public CustomResponseDto updatedBoard(Long boardId, Board updatedBoard, Long userId) {

        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        if (optionalBoard.isPresent()){
            Board board = optionalBoard.get();

            if (!userId.equals(board.getUser().getId())){
                throw new CustomRuntimeException(ErrorMessage.NOT_POST_OWNER, HttpStatus.BAD_REQUEST);
            }

            if (updatedBoard.getTitle() !=null){
                board.setTitle(updatedBoard.getTitle());
            }

            if (updatedBoard.getContent() != null){
                board.setContent(updatedBoard.getContent());
            }

            boardRepository.save(board);

            return new CustomResponseDto(SuccessMessage.BOARD_UPDATE_SUCCESSFUL, HttpStatus.OK);
        } else {
            throw new CustomRuntimeException(ErrorMessage.BOARD_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    //게시물 수정
    public CustomResponseDto deleteBoard(Long boardId, Long userId) {

        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        if (optionalBoard.isPresent()){
            Board board = optionalBoard.get();

            if (!userId.equals(board.getUser().getId())){
                throw new CustomRuntimeException(ErrorMessage.NOT_POST_OWNER, HttpStatus.BAD_REQUEST);
            }

            String fileName = board.getBoardImg().substring(board.getBoardImg().lastIndexOf("/") + 1);
            s3Service.deleteFileFromS3("board_img/" + fileName);

            boardRepository.delete(board);
            return new CustomResponseDto(SuccessMessage.BOARD_DELETE_SUCCESSFUL, HttpStatus.OK);
        } else {
            throw new CustomRuntimeException(ErrorMessage.BOARD_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }



    //게시물 삭제

    //게시물 조회

    //게시물 전체 조회
}
