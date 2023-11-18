// import PreviewMockup from "./previewMockup";
import { PreviewContainer } from "@/lib/style/main/home";
// import { MyBoardList } from "@/lib/types/response";
import BoardListItem from "../board/borderlistitem";
import { getBoardTopFive } from "@/api/get";
import { useQuery } from "react-query";

const Previewlist = () => {
  const {
    data: list,
    // isLoading: BoardTopfiveLoading,
    // isFetching: BoardTopfiveIsFetching,
  } = useQuery("getboardTopFive", getBoardTopFive, { suspense: true });
  const content = (
    <PreviewContainer>
      <div className="preview-logo">{"전체 게시물"}</div>
      <div className="preview-list">
        <div className="list-view-container">
          {list?.map((e) => (
            <BoardListItem {...e} key={e.id} />
          ))}
        </div>
      </div>
    </PreviewContainer>
  );

  return content;
};
export default Previewlist;
