import styled from "styled-components";

interface DetailContainerProps {
  updateFormToggle: boolean;
}
const DetailContainer = styled.div<DetailContainerProps>`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 2rem 0 2rem 2rem;
  .content-wrapper {
    display: flex;
    padding: 0 10px;
    flex-direction: column;
    .usersetting {
      display: flex;
      justify-content: flex-end;
      padding: 1px 5px;
      gap: 10px;
      .button {
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #5585e8;
        }
      }
    }
  }
  .content-wrapper,
  .img-wrraper {
    flex: 1;
  }
  .img-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    img {
      position: absolute;
      object-fit: contain;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .icon-container {
      .icon {
        position: absolute;
        margin: 5px;
        top: 0;
        width: 30px;
        height: 30px;
        object-fit: cover;
        z-index: 10;
      }
    }
  }
  .contents {
    padding: 10px 5px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    textarea {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: ${(props) => (props.updateFormToggle ? "solid 2px #1e90ff" : "none")};
      border-radius: 5px;
      font-size: 16px;
      resize: none;
    }
    .update-button {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      gap: 10px;
    }
  }
`;

export { DetailContainer };
