import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";
import { getEveryGet } from "@/api/get";
import BoardListMockItem from "./boardlistMockup";
import BoardListItem from "./borderlistitem";
import { GetGalleryListContainer } from "@/style/board/board";
import { useAppDispatch } from "@/hooks/useRedux";
import { userLogOut } from "@/store/slice/userSlice";

const GetBoardList = () => {
  const { data, isError } = useQuery("getboard", getEveryGet);
  const dispatch = useAppDispatch();
  const MockUpcontent = () =>
    [...Array(16)]
      .map((e) => {
        return { ...e, key: uuidv4() };
      })
      .map((e) => {
        return <BoardListMockItem key={e.key} />;
      });
  if (isError) {
    dispatch(userLogOut());
  }
  return (
    <GetGalleryListContainer>
      <div className="listPostContainer">
        {data ? data.map((item) => <BoardListItem key={item.id} {...item} />) : <MockUpcontent />}
      </div>
    </GetGalleryListContainer>
  );
};
export default GetBoardList;
