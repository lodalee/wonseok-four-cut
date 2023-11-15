import { deleteBoard, updateBoard } from "@/api/UpdateDelete";
import { getDetailBoard } from "@/api/get";
import { close } from "@/assets/icon/icons";
import useInput from "@/hooks/useInput";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ErrorPage from "@/routes/404";
import { userLogOut } from "@/store/slice/userSlice";
import { DetailContainer } from "@/style/detail/detail";
import { Button, Icon, Input } from "@/util";
import Spinner from "@/util/spinner";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.id);
  const {
    data: images,
    isSuccess,
    isError,
  } = useQuery(["imageDetail", id], () => getDetailBoard(id), { keepPreviousData: true });

  const navigate = useNavigate();
  const [title, onChangeTitle, setTitle] = useInput();
  const [content, onChangeContent, setContent] = useInput();
  const [updateFormToggle, setUpdateFormToggle] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (images) {
      setTitle(images.title);
      setContent(images.content);
    }
  }, [isSuccess]);

  if (isError) {
    dispatch(userLogOut());
  }

  const deleteButtonHandler = async () => {
    setDelLoading(true);
    await deleteBoard(`${images.id}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert(res.data.responseMessage);
          navigate("/gallery");
        }
      })
      .catch((err) => {
        alert("오류발생");
      })
      .finally(() => setDelLoading(false));
  };

  const updateButtonHandler = async () => {
    setUpdateLoading(true);
    await updateBoard(`${images.id}`, { content, title })
      .then(() => {
        alert("수정 성공");
        navigate("/gallery");
      })
      .catch((err) => {
        alert("오류발생");
        console.log(err);
        dispatch(userLogOut());
      })
      .finally(() => setUpdateLoading(false));
  };

  const setCancleHandler = () => {
    setTitle(images?.title);
    setContent(images?.content);
    setUpdateFormToggle(false);
  };

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      {images && (
        <DetailContainer updateFormToggle={updateFormToggle}>
          <div className="img-wrraper">
            <div className="img-container">
              <img src={images.uploadImage.storeFileName} alt="asdasd" />
              {updateFormToggle && (
                <div className="icon-container">
                  <Icon src={close} alt="" className="icon" />
                </div>
              )}
            </div>
          </div>
          <div className="content-wrapper">
            {user === images.username && (
              <div className="usersetting">
                {!updateFormToggle && (
                  <div className="button" onClick={() => setUpdateFormToggle(true)}>
                    수정
                  </div>
                )}
                <div className="button" onClick={deleteButtonHandler}>
                  {delLoading ? (
                    <Spinner color="#000" spinColor="gray" size={15} borderSize={2} />
                  ) : (
                    "삭제"
                  )}
                </div>
              </div>
            )}
            <div className="contents">
              <Input
                color="black"
                valueSize={24}
                value={title}
                onChange={onChangeTitle}
                InputSize="medium"
                disabled={!updateFormToggle}
                placeholder="제목입력"
              />
              <textarea
                color="black"
                value={content}
                onChange={onChangeContent}
                disabled={!updateFormToggle}
                // InputSize="large"
                placeholder="설명을 입력해주세요"
              />

              {updateFormToggle ? (
                <div className="update-button">
                  <Button
                    color="custom"
                    size="small"
                    title={
                      <>
                        {updateLoading ? (
                          <Spinner color="#000" spinColor="gray" size={15} borderSize={2} />
                        ) : (
                          "완료"
                        )}
                      </>
                    }
                    onClick={updateButtonHandler}
                  />
                  <Button
                    color="custom"
                    size="small"
                    title={<>취소</>}
                    onClick={setCancleHandler}
                  />
                </div>
              ) : (
                <div className="update-button">
                  <Button
                    color="custom"
                    size="small"
                    title={<>뒤로가기</>}
                    onClick={() => navigate(-1)}
                  />
                </div>
              )}
            </div>
          </div>
        </DetailContainer>
      )}
    </>
  );
};
export default Detail;
