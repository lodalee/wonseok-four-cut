import { signin } from "@/api/post";
import { hide, key, mail, view } from "@/assets/icon/icons";
import useInput from "@/hooks/useInput";
import { useAppDispatch } from "@/hooks/useRedux";
import { userSet } from "@/store/slice/userSlice";
import { SignInContainer } from "@/style/loginpage/signin";
import { Button, Input } from "@/util";
import Icon from "@/util/icon";
import Spinner from "@/util/spinner";
import { useState, FormEvent, useCallback } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [emailValue, emailOnChange] = useInput();
  const [passwordValue, passwordOnChange] = useInput();
  const [onView, setOnview] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onViewHandler = () => {
    setOnview(!onView);
  };
  const onSigninHandler = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      await signin({ password: passwordValue, username: emailValue })
        .then(() => {
          dispatch(userSet({ id: emailValue, nickname: passwordValue, token: "asd" }));
        })
        .catch((err) => {
          if (typeof err.response.data.message === "string") {
            alert(`${err.response.data.message}`);
          } else {
            alert(`${err.response.data.message[0]}`);
          }
        })
        .finally(() => setIsLoading(false));
    },
    [emailValue, passwordValue]
  );

  const signContent = (
    <SignInContainer>
      <h2 className="signin-h2">로그인</h2>
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
              InputSize="custom"
              className="input"
              backgroundColor={"#1a292e"}
              icon={key}
              id="password"
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
        <Button
          color="custom"
          size="custom"
          title={
            isLoading ? (
              <Spinner borderSize={4} color="#5585E8" size={20} spinColor="blue" />
            ) : (
              <>로그인</>
            )
          }
          type="submit"
          // onClick={signinHandler}
        />
      </form>
      <div className="sign-up-btn">
        <Link to={"/register"}>회원가입{">"}</Link>
      </div>
    </SignInContainer>
  );

  return signContent;
};
export default SignIn;
