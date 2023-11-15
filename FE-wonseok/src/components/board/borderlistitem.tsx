import {
  Avatar,
  BoardItemContainer,
  ItemBox,
  ItemContainer,
  ItemWrraper,
} from "@/style/board/board";
import { DateTime, UsersBoard } from "@/types/response";
import { useNavigate } from "react-router-dom";

const BoardListItem: React.FC<UsersBoard> = (props) => {
  const { uploadImage, title, username, createdAt, id } = props;
  const navigate = useNavigate();
  const convertToJSDate = (dateTime: DateTime): Date => {
    const [year, month, day, hour, minute, second] = dateTime;
    return new Date(year, month - 1, day, hour + 9, minute, second, 0);
  };

  const getTimeAgo = (dateTime: DateTime): string => {
    const date = convertToJSDate(dateTime);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return `${seconds}초 전`;
  };
  const detailNavigateHandler = (Boardid: number) => {
    navigate(`/board/${Boardid}`);
  };

  const content = (
    <BoardItemContainer>
      <ItemContainer onClick={() => detailNavigateHandler(id)}>
        <ItemBox className="itemBox">
          <img
            src={uploadImage?.storeFileName}
            alt="이미지누락"
            className="board-img"
          />
        </ItemBox>
        <div className="ItemContent">
          <div className="content-warrper">
            <Avatar>{username.split("@")[1].charAt(0)}</Avatar>
            <div className="contents">
              <p className="title">{title}</p>
              <div className="timename">
                <p className="created">{username}</p>
                <p className="created">
                  {createdAt ? getTimeAgo(createdAt) : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ItemContainer>
    </BoardItemContainer>
  );

  const lastItem = <ItemWrraper>{content}</ItemWrraper>;

  return <>{lastItem}</>;
};

export default BoardListItem;
