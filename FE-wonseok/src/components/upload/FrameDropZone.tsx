import React, { forwardRef, useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import styled from "styled-components";
interface NoImageContainerProps {
  onDrop: (item: { image: string }) => void;
  index: number;
}

const NoImageContainer: React.FC<NoImageContainerProps> = ({ onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "image",
    drop: (item: { image: string }) => onDrop(item),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <StyledNoImageContainer
      ref={drop}
      isOver={isOver && canDrop}
      canDrop={canDrop}
    >
      <p>Drop Image Here</p>
    </StyledNoImageContainer>
  );
};

const StyledNoImageContainer = styled.div<{
  isOver: boolean;
  canDrop: boolean;
}>`
  position: relative;
  display: flex;
  background-color: ${({ isOver, canDrop }) =>
    isOver ? (canDrop ? "green" : "red") : "white"};
  width: 100%;
  height: 20%;
`;

const Frame = forwardRef<HTMLCanvasElement>((props, ref) => {
  const [images, setImages] = useState<string[]>(new Array(4).fill(undefined));

  const handleDrop = (item: { image: string }, index: number) => {
    setImages((prevImages) => {
      if (index >= 0 && index < prevImages.length) {
        const updatedImages = [...prevImages];
        updatedImages[index] = item.image;
        return updatedImages;
      }

      return prevImages;
    });
  };

  return (
    <FrameContainer>
      {/* img도 드래그가 안되네 */}
      {images.map((imageUrl, index) => {
        if (imageUrl) {
          return (
            <ImageContainer key={index}>
              <img src={imageUrl} alt={`Image ${imageUrl}`} />
            </ImageContainer>
          );
        } else if (images.every((image) => image !== undefined)) {
          return (
            <canvas key={`canvas-${index}`} ref={ref}>
              <ImageContainer key={`image-container-${index}`}>
                <img src={imageUrl} alt={`Image ${imageUrl}`} />
              </ImageContainer>
            </canvas>
          );
        }

        return (
          <NoImageContainer
            key={index}
            onDrop={(item) => handleDrop(item, index)}
            index={index}
          />
        );
      })}
    </FrameContainer>
  );
});

const FrameContainer = styled.div`
  position: relative;
  display: flex;
  /* width: 600px; */
  max-width: 240px;
  min-width: 240px;
  gap: 8px;
  height: 720px;
  flex-direction: column;
  padding: 13px;
  justify-content: flex-start;
  background-color: rgb(222, 239, 255);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20%;
  top: 0;
  left: 0;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default Frame;

// (222,239,255)
// (255,222,239)
// (222,239,222)
// (0,0,0)
// (255,255,255)
