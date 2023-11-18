import { useQuery } from "react-query";
import { getEveryGet } from "@/api/get";
import BoardListItem from "./borderlistitem";
import { GetGalleryListContainer } from "@/lib/style/board/board";
// import { useAppDispatch } from "@/hooks/useRedux";
// import { userLogOut } from "@/store/slice/userSlice";

const GetBoardList = () => {
  const { data, isError } = useQuery("getboard", getEveryGet, {
    suspense: true,
  });
  // const dispatch = useAppDispatch();

  if (isError) {
    // dispatch(userLogOut());
  }
  return (
    <GetGalleryListContainer>
      <div className="listPostContainer">
        {data.map((item) => (
          <BoardListItem key={item.id} {...item} />
        ))}
      </div>
    </GetGalleryListContainer>
  );
};
export default GetBoardList;
