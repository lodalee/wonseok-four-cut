package com.bewonseok.domain.board.entity;

import com.bewonseok.domain.board.dto.request.BoardRequestDto;
import com.bewonseok.domain.user.entity.User;
import com.bewonseok.global.config.Auditing;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Board extends Auditing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String boardImg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;



    public Board(BoardRequestDto requestDto, User user, String boardImg) {
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.user = user;
        this.boardImg = boardImg;
    }

    public Board(Long boardId, String title, String content, String boardImg){
        this.id = boardId;
        this.title = title;
        this.content = content;
        this.boardImg = boardImg;
    }
}
