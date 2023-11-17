import styled, { keyframes } from "styled-components";
import { ThemeProps } from "../theme";

const GetGalleryListContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  .listPostContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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
  margin-bottom: 10px;
`;

const BoardItemMockContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 5px 5px;
`;
const ItemMockContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  .ItemContent {
    width: 100%;
    height: 40px;
    padding: 10px 0;
    .content-warrper {
      border-radius: 5px;
      height: 20px;
      animation: ${Skeleton} 1.5s infinite ease-in-out;
    }
  }
`;

const ItemMockBox = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  animation: ${Skeleton} 1.5s infinite ease-in-out;
  /* box-shadow: 0 0 40px rgba(8, 7, 16, 0.1); */
  border-radius: 15px;
`;
const Avatar = styled.div`
  max-width: 40px;
  width: 40px;
  height: 40px;
  font-weight: 600;
  border-radius: 100%;
  font-size: 1.2rem;
  background-color: #eee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 2px 2px;
  margin-bottom: 10px;
`;

const BoardItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 5px 5px;
`;
const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    .itemBox {
      border: 3px solid #5585e8;
    }
  }
  .ItemContent {
    width: 100%;
    height: 40px;
    padding: 10px 0;
    .content-warrper {
      display: flex;
      border-radius: 5px;
      height: 40px;
      .contents {
        display: flex;
        height: 100%;
        gap: 2px;
        padding: 0 0 0 10px;
        flex-direction: column;
        justify-content: center;
        .created {
          font-size: 11px;
          font-weight: 500;
        }
        .title {
          font-size: 15px;
          font-weight: 500;
        }
        .timename {
          display: flex;
          gap: 10px;
        }
      }
    }
  }
`;

const ItemBox = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  transition: all 0.2s;
  .board-img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

export {
  GetGalleryListContainer,
  BoardItemContainer,
  ItemBox,
  ItemWrraper,
  ItemContainer,
  BoardItemMockContainer,
  ItemMockBox,
  ItemMockContainer,
  ItemMockWrraper,
  Avatar,
};
