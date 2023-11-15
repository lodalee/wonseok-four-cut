import { background } from "@/assets/img";
import { LoginContainer } from "@/style/loginpage/page";
import { useRef } from "react";
import { useLocation, useOutlet } from "react-router-dom";
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
          <a href="">
            11조프로젝트
            {/* 로고이미지 */}
          </a>
          <h1>안녕하십니까 11조 </h1>
        </div>
      </div>
      <div className="right-Wrraper">
        <div className="right-container">
          <SwitchTransition>
            <CSSTransition nodeRef={nodeRef} key={location.key} timeout={300} classNames="page">
              <div ref={nodeRef}>{currentOutlet}</div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </LoginContainer>
  );
};
export default LoginLayout;
