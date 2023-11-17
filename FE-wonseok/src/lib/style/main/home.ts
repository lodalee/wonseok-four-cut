import styled, { keyframes } from "styled-components";
import { ThemeProps } from "../theme";

const CarouselWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  margin: auto;
  height: 35vh;
`;

const CarouselSlide = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
`;

const CarouselItem = styled.div`
  flex: 1 0 100%;
  flex-basis: 50%;
  max-width: 50%;
  position: relative;
  img {
    object-fit: cover;
  }
`;

const PreviewContainer = styled.div`
  position: relative;
  margin-top: 10px;
  .preview-list {
    width: 100%;
    height: 100%;
    padding-bottom: 60px;
    padding-top: 16px;
    .list-view-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`;
const ItemContainer = styled.div<ThemeProps>`
  width: 20%;
  @media ${(props) => props.theme.size.large} {
    width: 25%;
  }
  @media ${(props) => props.theme.size.small} {
    width: 33%;
  }
  min-width: 200px;
  padding: 5px;
  .item-wrraper {
    display: flex;
    flex-direction: column;
    .item-img-container {
      background-color: #eee;
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;
      padding-top: 75%;
      position: relative;
      width: 100%;
    }
    .item-title-container {
      flex: 0;
      max-width: 100%;
      text-overflow: ellipsis;

      .title {
        font-weight: 600;
        text-align: start;
        font-size: 1.1rem;
        line-height: 2.2rem;
      }
    }
  }
`;

const Skeleton = keyframes`
    0% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.6);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.3);
    }
`;
const ItemMockContainer = styled.div<ThemeProps>`
  width: 20%;
  padding: 5px;
  @media ${(props) => props.theme.size.large} {
    width: 25%;
  }
  @media ${(props) => props.theme.size.small} {
    width: 33%;
  }
  .item-wrraper {
    display: flex;
    flex-direction: column;
    .item-img-container {
      background-color: #eee;
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;
      padding-top: 75%;
      position: relative;
      width: 100%;
      animation: ${Skeleton} 1.5s infinite ease-in-out;
    }
    .item-title-container {
      flex: 0;
      max-width: 100%;
      width: 60%;
      height: 8px;
      background-color: #eee;
      animation: ${Skeleton} 1.5s infinite ease-in-out;
      text-overflow: ellipsis;
      border-radius: 8px;
      margin-top: 10px;

      .mock-title {
        width: 60%;
        height: 10px;
        font-weight: 600;
        text-align: start;
        font-size: 1.1rem;
        line-height: 2.2rem;
      }
    }
  }
`;

export {
  CarouselWrapper,
  CarouselSlide,
  CarouselItem,
  PreviewContainer,
  ItemContainer,
  ItemMockContainer,
};
