/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProps } from "@/lib/style/theme";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";

interface CanvasDropZoneProps {
  onDrop: (image: string, index: number) => void;
}

const CanvasDropZone: React.FC<CanvasDropZoneProps> = ({ onDrop }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      const frameImage = new Image();
      console.log("asdf");
      frameImage.onload = () => {
        canvas.width = frameImage.width;
        canvas.height = frameImage.height;
        // 프레임 이미지를 Canvas에 그리기
        context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
      };
      frameImage.src = "../public/frame/wonseokframe.png"; // 프레임 이미지 경로로 수정

      // 이후에 다른 이미지를 추가할 수 있도록 이벤트 핸들러 등록
      // 예를 들어, drag-and-drop 이벤트를 통해 이미지를 추가할 수 있습니다.
    }
  }, [canvasRef]);

  return (
    <CanvasContainer>
      <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }}></canvas>
    </CanvasContainer>
  );
};

export default CanvasDropZone;

const CanvasContainer = styled.div<ThemeProps>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  canvas {
    position: absolute;
    object-fit: contain;
    width: 100%;
    height: 100%;
    @media ${(props) => props.theme.size.small} {
    }
  }
`;
