package com.bewonseok.domain.board.service;

import com.bewonseok.domain.board.entity.BoardImg;
import com.bewonseok.global.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardImageService {

    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    //이미지를 S3에 업로드하고, PostImg 객체를 생성하여 리스트에 추가
    public List<BoardImg> uploadImagesToS3AndCreateBoardImages(List<MultipartFile> images) throws IOException {
        List<BoardImg> boardImgs = new ArrayList<>();

        for (MultipartFile photo : images) {
            if (!photo.isEmpty()) { // 파일이 비어있지 않은 경우에만 업로드 진행
                String fileName = s3Service.uploadFileToS3(photo, "board_img");
                String url = s3Service.getURLFromS3("board_img/" + fileName);
                BoardImg boardImg = new BoardImg(url, null);
                boardImgs.add(boardImg);
            }
        }
        return boardImgs;
    }
}
