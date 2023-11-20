import BoardDetailComponent from "@/components/board/boarddetail/boarddetail";
// import { useAppDispatch } from "@/hooks/useRedux";
// import { userLogOut } from "@/store/slice/userSlice";
import { BoardDetailContainer } from "@/lib/style/detail/boarddetail";
import { Suspense } from "react";

const BoardDetail = () => {
  const MockContent = () => (
    <>
      <div className="mock-title"></div>
      <div className="mock-sub-title"></div>
      <div className="mock-image-Wrraper">
        <img src="" alt="" className="image" />
      </div>
      <div className="mock-content"></div>
      <div className="mock-comment"></div>
    </>
  );

  return (
    <BoardDetailContainer>
      <div className="DetailWrraper">
        <Suspense fallback={<MockContent />}>
          <BoardDetailComponent />
        </Suspense>
      </div>
    </BoardDetailContainer>
  );
};
export default BoardDetail;
