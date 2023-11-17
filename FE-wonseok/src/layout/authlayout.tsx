import { background } from "@/assets/img";
import { LoginContainer } from "@/lib/style/loginpage/page";
import { useRef } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const LoginLayout = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const currentOutlet = useOutlet();
  return (
    <LoginContainer background={background}>
      <div className="left-Wrraper">
        <div className="left-Wrraper-filter"></div>
        <div className="left-Wrraper-container">
          <Link to={"/main"} className="left-Wrraper-logo">
            원석네컷
            {/* 로고이미지 */}
          </Link>
          <h1>이미지를 꾸며가세요</h1>
        </div>
      </div>
      <div className="right-Wrraper">
        <div className="right-container">
          <SwitchTransition>
            <CSSTransition
              nodeRef={nodeRef}
              key={location.key}
              timeout={300}
              classNames="page"
            >
              <div ref={nodeRef}>{currentOutlet}</div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </LoginContainer>
  );
};
export default LoginLayout;
