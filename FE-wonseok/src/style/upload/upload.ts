import styled from "styled-components";
interface UploadProps {
  previewImage: boolean;
}
const UploadContainer = styled.div<UploadProps>`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  .uploaddiv {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 20px;
  }
  .pictureContainer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-flow: 1;
    width: 100%;
    min-height: 500px;
    border: 1px dashed gray;
    border-radius: 10px;
    background-color: ${(props) => (props.previewImage ? "rgba(0, 0, 0, 0.8)" : "#fff")};

    img {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .delbtn {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      margin: 10px;
    }
  }
  .pictureContent {
    display: flex;
    flex-direction: column;
    flex-flow: 1;
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    gap: 20px;
    h1 {
      font-size: 2.2rem;
    }
    textarea {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 5px;
      font-size: 16px;
      resize: none;
    }
  }
`;

export { UploadContainer };
