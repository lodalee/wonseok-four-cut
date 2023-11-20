import { SignInContainer } from "@/lib/style/loginpage/signin";
import kakao from "../assets/logo/kakao_login_medium_wide.png";
import { kakaoLinkOptions, socialhandler } from "@/lib/util/action";
import { Link } from "react-router-dom";

const SignInMain = () => {
  // const onSubmitHandler = (e: FormEvent) => {
  //   e.preventDefault();
  // };
  const signContent = (
    <SignInContainer>
      <h2 className="signin-h2">로그인</h2>
      <p className="">카카오톡 로그인으로 가입할s 수 있습니다.</p>
      <hr className="sign-hr-tag" />
      <form className="signin-form" autoComplete="off">
        <div className="login-btn-kakao">
          <img
            src={kakao}
            alt=""
            className="login-btn-kakao-btn"
            onClick={() => {
              socialhandler(kakaoLinkOptions);
            }}
          />
        </div>
      </form>
      <form className="signin-form" autoComplete="off">
        <Link to={"/signin"}>
          <div className="login-btn-signidpw">
            <span>이메일로 로그인</span>
          </div>
        </Link>
      </form>
    </SignInContainer>
  );

  return signContent;
};
export default SignInMain;
