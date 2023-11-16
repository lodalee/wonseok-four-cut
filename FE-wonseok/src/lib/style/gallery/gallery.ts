import styled, { keyframes } from "styled-components";
import { ThemeProps } from "../theme";

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
const ItemMockWrraper = styled.div<ThemeProps>`
  width: 25%;
  @media ${(props) => props.theme.size.large} {
    width: 33%;
  }
  @media ${(props) => props.theme.size.small} {
    width: 100%;
  }
  margin: 0;
  padding: 2px 2px;
`;

const GalleryItemMockContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 5px;
  animation: ${Skeleton} 1.5s infinite ease-in-out;
`;

const ItemMockBox = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  /* box-shadow: 0 0 40px rgba(8, 7, 16, 0.1); */
  border-radius: 15px;
`;
const ItemMockContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const ItemWrraper = styled.div<ThemeProps>`
  width: 25%;
  @media ${(props) => props.theme.size.large} {
    width: 33%;
  }
  @media ${(props) => props.theme.size.small} {
    width: 100%;
  }
  margin: 0;
`;

const GalleryItemContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1px;
`;

const ItemBox = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1);
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export {
  ItemMockWrraper,
  GalleryItemMockContainer,
  ItemMockBox,
  ItemMockContainer,
  GalleryItemContainer,
  ItemBox,
  ItemWrraper,
};
