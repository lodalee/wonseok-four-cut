import { menu, setting } from "@/assets/icon/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { userLogOut, userSet } from "@/store/slice/userSlice";
import { HeaderContainer } from "@/style/layoutstyle/layout";
import { Button } from "@/util";
import Icon from "@/util/icon";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Avatar = styled.div`
  max-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #eee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 20px;
    font-weight: 600;
  }
`;

interface HeaderProps {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { setSidebar } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.id);
  return (
    <HeaderContainer>
      <div className="header-wrraper">
        <div className="left-wrraper">
          <div className="icon-container">
            <Icon
              src={menu}
              alt="asd"
              className={"icon"}
              onClick={() => {
                setSidebar((prev) => !prev);
              }}
            />
          </div>
          <div className="logo">
            <a className="logo-tag">11조 프로젝트</a>
          </div>
        </div>
        <div className="center-wrraper"></div>
        <div className="right-wrraper">
          <div className="icon-container">
            <Icon src={setting} alt="asd" className={"icon"} />
          </div>
          <div className="addpicture-btn">
            <Button
              color="custom"
              size="small"
              title={<p className="btn-p">이미지업로드</p>}
              onClick={() => navigate("/gallery/upload")}
            />
          </div>
          <Avatar
            onClick={() => {
              dispatch(userLogOut());
            }}
          >
            {/* <p>{user.split("@")[1].charAt(0)}</p> */}

            {/* <img src="" alt="asd" className="avatar" /> */}
          </Avatar>
        </div>
      </div>
    </HeaderContainer>
  );
};
export default Header;
