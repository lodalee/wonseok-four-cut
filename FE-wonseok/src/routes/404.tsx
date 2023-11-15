import styled from "styled-components";

const ErrorPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  width: calc(100% - 260px);
  height: 100vh;
  background-color: #09171c;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h1 {
    font-size: 4rem;
  }
  h3 {
    font-size: 2rem;
  }
`;

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <div>
        <h1>404</h1>
        <h3>not found</h3>
      </div>
    </ErrorPageContainer>
  );
};
export default ErrorPage;
