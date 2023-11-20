import { getDetailBoard } from "@/api/get";
import { ModalContainer } from "@/lib/style/detail/boarddetail";
import { Modal } from "@/lib/util/ui/modal";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const BoardDetailComponent = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const { boardId } = useParams();

  const { data } = useQuery(
    ["boardDetail", boardId],
    () => getDetailBoard(boardId),
    {
      keepPreviousData: true,
      suspense: true,
    }
  );
  const { board, user } = data;
  return (
    <>
      <div className="title">
        <h1>{board.title}</h1>
      </div>
      <div className="sub-title">
        <p className="modifined">
          {/* {"수정일 : " +
                  modifiedAt[0] +
                  "년 " +
                  modifiedAt[1] +
                  "월 " +
                  modifiedAt[2] +
                  "일 "} */}
        </p>
        <p className="username">{"작성자 : " + user.nickname}</p>
      </div>
      <div className="image-Wrraper" onClick={() => setModalToggle(true)}>
        <img src={board.boardImg} alt="aa" className="image" />
      </div>
      <div className="content" style={{ whiteSpace: "pre-line" }}>
        <p>{board.content}</p>
      </div>
      <div className="comment"></div>
      {modalToggle && (
        <Modal
          setModal={setModalToggle}
          element={
            <ModalContainer>
              <img
                src={board.boardImg}
                loading="lazy"
                alt="aa"
                className="boardImage"
              />
            </ModalContainer>
          }
        />
      )}
    </>
  );
};
export default BoardDetailComponent;
