import {
  BoardItemMockContainer,
  ItemMockContainer,
  ItemMockBox,
  ItemWrraper,
} from "@/style/board/board";

const BoardListMockItem = () => {
  const Mockcontent = (
    <BoardItemMockContainer>
      <ItemMockContainer>
        <ItemMockBox />
        <div className="ItemContent">
          <div className="content-warrper">
            <div className="contents">
              <p className="title"></p>
            </div>
          </div>
        </div>
      </ItemMockContainer>
    </BoardItemMockContainer>
  );

  const lastItem = <ItemWrraper>{Mockcontent}</ItemWrraper>;

  return <>{lastItem}</>;
};

export default BoardListMockItem;
