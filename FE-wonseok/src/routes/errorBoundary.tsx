import { getErrorMessage } from "@/lib/util/action";
import { useNavigate } from "react-router-dom";

function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();
  if (error === undefined || error.response === undefined) {
    return (
      <div>
        <h2>네트워크에러</h2>
      </div>
    );
  }
  const { status } = error.response;
  const { title, content } = getErrorMessage(status);
  const isNotAuthorized = status === 401 || status === 403;
  const buttonMessage = isNotAuthorized ? "로그인" : "새로고침";

  const onClickHandler = () => {
    if (isNotAuthorized) {
      navigate("/login");
    } else {
      resetErrorBoundary();
    }
  };

  return (
    <div className="error-fallback-wrapper">
      <div className="inner">
        <h2 className="title">{title}</h2>
        <p className="content">{content}</p>
        <button type="button" onClick={onClickHandler}>
          {buttonMessage}
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
