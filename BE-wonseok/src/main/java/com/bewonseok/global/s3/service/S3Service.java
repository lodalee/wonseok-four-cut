package com.bewonseok.global.s3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String uploadFileToS3(MultipartFile file, String dir) throws IOException {
        // 파일 정보 설정
        long size = file.getSize();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(size);
        objectMetadata.setContentDisposition("inline");

        // 파일 이름 설정
        String prefix = UUID.randomUUID().toString();
        String fileName = prefix + "_" + file.getOriginalFilename();
        String bucketFilePath = dir + "/" + fileName;

        // 파일 리사이징 처리
        BufferedImage originalImage = ImageIO.read(file.getInputStream());
        int targetWidth = 500; // 가로 길이를 500px로 설정
        String formatName = getFormatName(file);

        if (originalImage.getWidth() > targetWidth) {
            BufferedImage resizedImage = resizeImage(originalImage, targetWidth);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(resizedImage, formatName, outputStream);
            byte[] resizedImageBytes = outputStream.toByteArray();
            objectMetadata.setContentLength(resizedImageBytes.length);
            amazonS3Client.putObject(new PutObjectRequest(bucketName, bucketFilePath,
                    new ByteArrayInputStream(resizedImageBytes), objectMetadata));
        } else {
            byte[] fileBytes = file.getBytes();
            objectMetadata.setContentLength(fileBytes.length);
            amazonS3Client.putObject(new PutObjectRequest(bucketName, bucketFilePath,
                    new ByteArrayInputStream(fileBytes), objectMetadata));
        }

        return fileName;
    }

    public BufferedImage resizeImage(BufferedImage originalImage, int targetWidth) {
        double aspectRatio = (double) originalImage.getHeight() / originalImage.getWidth();
        int targetHeight = (int) (targetWidth * aspectRatio);
        BufferedImage scaledImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = scaledImage.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        g2d.dispose();
        return scaledImage;
    }

    private String getFormatName(MultipartFile photo) {
        String originalFileName = photo.getOriginalFilename();
        int lastDotIndex = originalFileName.lastIndexOf(".");
        if (lastDotIndex == -1 || lastDotIndex == 0) {
            return null;
        }
        return originalFileName.substring(lastDotIndex + 1);
    }

    public void deleteFileFromS3(String filePath) {
        amazonS3Client.deleteObject(bucketName, filePath);
    }

    public String getURLFromS3(String filePath) {
        return "https://s3.ap-northeast-2.amazonaws.com/" + bucketName + "/" + filePath;
    }
}