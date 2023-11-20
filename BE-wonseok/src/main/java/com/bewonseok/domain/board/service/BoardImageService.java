package com.bewonseok.domain.board.service;

import com.bewonseok.global.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class BoardImageService {

    private final S3Service s3Service;

    // 이미지를 S3에 업로드하고, BoardImage 객체를 생성하여 반환
    public String uploadImageToS3AndCreateBoardImage(MultipartFile image) throws IOException {
        String fileName = s3Service.uploadFileToS3(image, "board_img");
        String url = s3Service.getURLFromS3("board_img/" + fileName);
        return url;
    }
}
