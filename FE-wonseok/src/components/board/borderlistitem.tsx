import {
  Avatar,
  BoardItemContainer,
  ItemBox,
  ItemContainer,
  ItemWrraper,
} from "@/lib/style/board/board";
import { BoardGetData } from "@/lib/types/response";
import { useNavigate } from "react-router-dom";

const BoardListItem: React.FC<BoardGetData> = ({ board, user, createAt }) => {
  const { boardId, boardImg, title } = board;
  const { nickname } = user;
  const navigate = useNavigate();
  const convertToJSDate = (javaDate: string): Date => {
    const dateWithoutMicroseconds = javaDate.slice(0, 23);
    const date = new Date(dateWithoutMicroseconds);
    date.setHours(date.getHours());
    return date;
  };

  const getTimeAgo = (javaDate: string): string => {
    const date = convertToJSDate(javaDate);
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

  const contents = (
    <BoardItemContainer>
      <ItemContainer onClick={() => detailNavigateHandler(boardId)}>
        <ItemBox className="itemBox">
          <img src={boardImg} alt="이미지누락" className="board-img" />
        </ItemBox>
        <div className="ItemContent">
          <div className="content-warrper">
            <Avatar>{nickname.charAt(0)}</Avatar>
            <div className="contents">
              <p className="title">{title}</p>
              <div className="timename">
                <p className="created">{nickname}</p>
                <p className="created">
                  {createAt ? getTimeAgo(createAt) : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ItemContainer>
    </BoardItemContainer>
  );

  const lastItem = <ItemWrraper>{contents}</ItemWrraper>;

  return <>{lastItem}</>;
};

export default BoardListItem;
