import { signup } from "@/api/post";
import { mail, key, hide, view } from "@/assets/icon/icons";
import useInput from "@/hooks/useInput";
import { useAppDispatch } from "@/hooks/useRedux";
import { userLogOut } from "@/store/slice/userSlice";
import { SignInContainer } from "@/style/loginpage/signin";
import { Input, Button } from "@/util";
import Icon from "@/util/icon";
import Spinner from "@/util/spinner";
import { useState, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [emailValue, emailOnChange] = useInput();
  const [passwordValue, passwordOnChange] = useInput();
  const [retryPasswordValue, retryOnChange] = useInput();
  const [onView, setOnview] = useState<boolean>();
  const [signLoading, setSignLoading] = useState(false);
  const [, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email: string) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    var re = /[\s\W]/;
    return !re.test(String(password));
  };
  const onViewHandler = () => {
    setOnview(!onView);
  };

  const onSigninHandler = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setSignLoading(true);

      if (passwordValue !== retryPasswordValue) {
        setErrorMessage("비밀번호가 같지않아요");
        setSignLoading(false);
        return alert("비밀번호가 같지않아요");
      }

      await signup({
        username: emailValue,
        password: passwordValue,
      })
        .then((res) => {
          console.log(res);
          alert("회원가입 완료");
          navigate("/");
        })
        .catch((err) => {
          if (typeof err.response.data.message === "string") {
            alert(`${err.response.data.message}`);
          } else {
            alert(`${err.response.data.message[0]}`);
          }
        })
        .finally(() => {
          setSignLoading(false);
        });

      setErrorMessage("");

      // api 호출이요
    },
    [emailValue, passwordValue, retryPasswordValue]
  );

  const signContent = (
    <SignInContainer>
      <div className="h1Space">
        <h2 className="signin-h2">회원가입</h2>
        <p onClick={() => navigate(-1)}>뒤로가기</p>
      </div>
      <form onSubmit={onSigninHandler} className="signin-form" autoComplete="off">
        <div className="signin-email-container">
          <label htmlFor="email" className="signin-label">
            이메일 *
          </label>
          <div className="inputForm">
            <Icon src={mail} alt="asd" className={"icon-mail"} />
            <Input
              InputSize="custom"
              icon={mail}
              id="email"
              color="custom"
              // type="email"
              onChange={emailOnChange}
              value={emailValue}
              placeholder={"아이디를 입력해주세요"}
            />
          </div>
        </div>
        <div className="signin-password-container">
          <label htmlFor="password" className="signin-label">
            비밀번호 *
          </label>
          <div className="inputForm">
            <Icon src={key} alt="asd" className={"icon-mail"} />
            <Input
              className="input"
              backgroundColor={"#1a292e"}
              icon={key}
              id="password"
              InputSize="custom"
              color="custom"
              type={onView ? "text" : "password"}
              onChange={passwordOnChange}
              value={passwordValue}
              placeholder={"비밀번호를 입력해주세요"}
            />
            {passwordValue.length > 0 && (
              <>
                {onView ? (
                  <img className="icon-hide" src={hide} onClick={onViewHandler} />
                ) : (
                  <img className="icon-hide" src={view} onClick={onViewHandler} />
                )}
              </>
            )}
          </div>
        </div>
        <div className="signin-password-container">
          <label htmlFor="password" className="signin-label">
            비밀번호 재확인 *
          </label>
          <div className="inputForm">
            <Icon src={key} alt="asd" className={"icon-mail"} />
            <Input
              color="custom"
              className="input"
              backgroundColor={"#1a292e"}
              icon={key}
              id="passwordretry"
              InputSize="custom"
              type={onView ? "text" : "password"}
              onChange={retryOnChange}
              value={retryPasswordValue}
              placeholder={"비밀번호를 다시한번 입력해주세요"}
            />
            {retryPasswordValue.length > 0 && (
              <>
                {onView ? (
                  <img className="icon-hide" src={hide} onClick={onViewHandler} />
                ) : (
                  <img className="icon-hide" src={view} onClick={onViewHandler} />
                )}
              </>
            )}
          </div>
        </div>
        <Button
          color="custom"
          size="custom"
          title={
            <>
              {signLoading ? (
                <Spinner borderSize={3} color="white" size={18} spinColor="gray" />
              ) : (
                "완료"
              )}
            </>
          }
          type="submit"
        />
      </form>
    </SignInContainer>
  );

  return signContent;
};
export default Register;
