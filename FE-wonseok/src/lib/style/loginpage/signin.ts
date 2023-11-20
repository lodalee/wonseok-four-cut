import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0 0 15px;
  .h1Space {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: flex-start;
    cursor: pointer;
    p {
      font-size: 14px;
      &:hover {
        color: #00e1db;
      }
    }
  }
  .sign-hr-tag {
    width: 80%;
  }
  .signin-h2 {
    margin-bottom: 30px;
    margin-top: 0;
    font-size: 30px;
    font-weight: 600;
    line-height: 1.2;
  }
  .signin-form {
    .login-btn-signidpw {
      width: 300px;
      height: 45px;
      background-color: #00e1db;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      span {
        text-align: center;
        font-size: 0.9rem;
        font-weight: 700;
        color: #1a292e;
      }
    }
    .signin-password-container,
    .signin-email-container {
      margin-bottom: 30px;
    }
    .login-btn-kakao-btn {
      cursor: pointer;
    }
    .signin-form {
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: 500;
    }
    .signin-label {
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: 500;
      display: block;
    }
  }
  .inputForm {
    width: 100%;
    display: flex;
    border-radius: 10px;
    border: 1px solid #1a292e;
    background-color: #1a292e;
    padding: 2px 5px;
    &:focus-within {
      border-color: #00e1db;
    }
  }
  .icon-hide,
  .icon-mail {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: auto;
    padding: 15px;
    color: #fff;
    filter: invert(1);
  }
  .icon-hide {
    cursor: pointer;
  }
  .sign-up-btn {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    margin: 20px 0;
    a {
      color: #fff;
    }
  }
`;
