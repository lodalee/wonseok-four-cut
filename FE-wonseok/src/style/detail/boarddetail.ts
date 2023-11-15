import styled from "styled-components";

const BoardDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 20px 0;
  .DetailWrraper {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    width: 800px;
    height: 100%;
    gap: 10px;
  }
  .title {
    h1 {
      font-size: 2.3rem;
    }
  }
  .sub-title {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;

    .modifined {
      font-size: 13px;
      color: #ccc;
    }
    .username {
      font-size: 14px;
    }
  }
  .image-Wrraper {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.9);
    margin: 10px 0;
    cursor: pointer;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .content {
      white-space: pre-wrap;
      p {
        white-space: pre-line;
      }
    }
  }
`;
const ModalContainer = styled.div`
  z-index: 1000;
  width: 100%;
  height: 100%;
  .boardImage {
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    display: inline-block;
    border: 0;
    overflow: clip;
    transition: transform 0.3s ease;
    transform: scale(1);
  }
`;

export { ModalContainer, BoardDetailContainer };
