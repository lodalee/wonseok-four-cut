import { getDetailBoard } from "@/api/get";
import { useAppDispatch } from "@/hooks/useRedux";
import { userLogOut } from "@/store/slice/userSlice";
import {
  BoardDetailContainer,
  ModalContainer,
} from "@/style/detail/boarddetail";
import { Modal } from "@/util/modal";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const BoardDetail = () => {
  const { boardId } = useParams();

  const { data: board, isError } = useQuery(
    ["boardDetail", boardId],
    () => getDetailBoard(boardId),
    {
      keepPreviousData: true,
    }
  );
  const [modalToggle, setModalToggle] = useState(false);
  const dispatch = useAppDispatch();
  if (isError) {
    dispatch(userLogOut());
  }
  const mockcontent = (
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
        {board ? (
          <>
            <div className="title">
              <h1>{board.title}</h1>
            </div>
            <div className="sub-title">
              <p className="modifined">
                {"수정일 : " +
                  board.modifiedAt[0] +
                  "년 " +
                  board.modifiedAt[1] +
                  "월 " +
                  board.modifiedAt[2] +
                  "일 "}
              </p>
              <p className="username">{"작성자 : " + board.username}</p>
            </div>
            <div className="image-Wrraper" onClick={() => setModalToggle(true)}>
              <img
                src={board.uploadImage.storeFileName}
                alt="aa"
                className="image"
              />
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
                      src={board.uploadImage.storeFileName}
                      loading="lazy"
                      alt="aa"
                      className="boardImage"
                    />
                  </ModalContainer>
                }
              />
            )}
          </>
        ) : (
          mockcontent
        )}
      </div>
    </BoardDetailContainer>
  );
};
export default BoardDetail;
