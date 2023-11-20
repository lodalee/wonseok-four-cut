package com.bewonseok.domain.board.service;

import com.bewonseok.domain.board.dto.request.BoardRequestDto;
import com.bewonseok.domain.board.dto.response.BoardInfoResponseDto;
import com.bewonseok.domain.board.dto.response.BoardResponseDto;
import com.bewonseok.domain.board.dto.response.BoardUserResponseDto;
import com.bewonseok.domain.board.dto.response.PageBoardResponseDto;
import com.bewonseok.domain.board.entity.Board;
import com.bewonseok.domain.board.repository.BoardRepository;
import com.bewonseok.domain.user.entity.User;
import com.bewonseok.global.dto.response.CustomResponseDto;
import com.bewonseok.global.dto.response.constant.SuccessMessage;
import com.bewonseok.global.exception.CustomRuntimeException;
import com.bewonseok.global.exception.constant.ErrorMessage;
import com.bewonseok.global.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    //게시물 수정
    public CustomResponseDto updatedBoard(Long id, Board updatedBoard, Long userId) {
        Board board = findBoard(id);

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
    }

    //게시물 삭제
    public CustomResponseDto deleteBoard(Long id, Long userId) {
        Board board = findBoard(id);

        if (!userId.equals(board.getUser().getId())){
            throw new CustomRuntimeException(ErrorMessage.NOT_POST_OWNER, HttpStatus.BAD_REQUEST);
        }

        String fileName = board.getBoardImg().substring(board.getBoardImg().lastIndexOf("/") + 1);
        s3Service.deleteFileFromS3("board_img/" + fileName);

        boardRepository.delete(board);
        return new CustomResponseDto(SuccessMessage.BOARD_DELETE_SUCCESSFUL, HttpStatus.OK);
    }


    //게시물 조회
    public BoardResponseDto getOneBoard(Long id) {
        Board board = findBoard(id);

        BoardUserResponseDto user = new BoardUserResponseDto(board.getUser().getId(), board.getUser().getUserImage());
        BoardInfoResponseDto boardInfoResponseDto = new BoardInfoResponseDto(board.getId(), board.getTitle(), board.getContent(), board.getBoardImg());
        LocalDateTime createdAt = board.getCreatedAt();
        LocalDateTime modifiedAt = board.getModifiedAt();

        return new  BoardResponseDto(user, boardInfoResponseDto, createdAt, modifiedAt);
    }


    //게시물 전체 조회
    public PageBoardResponseDto getBoards(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Board> boards = boardRepository.findAll(pageable);

        List<BoardResponseDto> boardResponseDto = boards.getContent().stream()
                .map(board -> new BoardResponseDto(
                        new BoardUserResponseDto(board.getUser().getId(), board.getUser().getUserImage()), // BoardUserResponseDto 객체 생성
                        new BoardInfoResponseDto(board.getId(), board.getTitle(), board.getContent(), board.getBoardImg()), // BoardInfoResponseDto 객체 생성
                        board.getCreatedAt(),
                        board.getModifiedAt()
                ))
                .collect(Collectors.toList());

        return new PageBoardResponseDto(SuccessMessage.GET_BOARD_SUCCESSFUL,
                boards.getTotalPages(),
                boards.getTotalElements(),
                size,
                boardResponseDto);
    }

    public Board findBoard(Long id){
        return boardRepository.findById(id).orElseThrow(() ->
        new CustomRuntimeException(ErrorMessage.BOARD_NOT_FOUND, HttpStatus.NOT_FOUND));
    }
}
