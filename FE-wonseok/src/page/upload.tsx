import { upload } from "@/api/post";
import useImageSelect from "@/hooks/useImageSelect";
import useInput from "@/hooks/useInput";
import { useAppSelector } from "@/hooks/useRedux";
import { UploadContainer } from "@/lib/style/upload/upload";
import { Button, Input } from "@/lib/util/ui";
import Spinner from "@/lib/util/ui/spinner";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [title, onChangeTitleValue] = useInput();
  const [content, onChangeContentValue] = useInput();
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((state) => state.user.tokens.accessToken);
  const navigate = useNavigate();
  const {
    inputRef,
    onUploadImage,
    onUploadImageButtonClick,
    previewImage,
    setPreviewImage,
  } = useImageSelect();

  const onUploadToServerButtonClick = useCallback(async () => {
    setLoading(true);

    if (!inputRef.current?.files?.[0]) {
      alert("이미지가없어요");
      return setLoading(false);
    }

    if (!title || !content) {
      alert("빈칸을 채워주세요!");
      return setLoading(false);
    }

    const post = {
      title,
      content,
    };

    const formData = new FormData();
    formData.append("photos", inputRef.current.files[0]);
    formData.append(
      "board",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );

    try {
      const response = await upload(formData, token);
      if (response.status === 200) {
        alert(response.data.message);
        return navigate("/gallery");
      }
    } catch (error) {
      console.log(error);
      alert("실패");
    } finally {
      setLoading(false);
    }
  }, [title, content]);

  return (
    <UploadContainer previewImage={!!previewImage}>
      <div className="uploaddiv">
        <div className="pictureContainer">
          <input
            type="file"
            ref={inputRef}
            onChange={onUploadImage}
            style={{ display: "none" }}
          />
          {previewImage ? (
            <>
              <div className="delbtn">
                <Button
                  color="custom"
                  title={<>삭제</>}
                  size="small"
                  onClick={() => setPreviewImage(null)}
                />
              </div>
              <img src={previewImage} alt="asad" />
            </>
          ) : (
            <>
              <p>이미지를 업로드해주세요</p>
              <Button
                color="custom"
                size="small"
                title={<>사진선택</>}
                onClick={onUploadImageButtonClick}
              />
            </>
          )}
        </div>
        <div className="pictureContent">
          <h1>이미지를 설명해주세요</h1>
          <Input
            color="black"
            value={title}
            onChange={onChangeTitleValue}
            InputSize="medium"
            placeholder="제목입력"
          />
          <textarea
            color="black"
            value={content}
            onChange={onChangeContentValue}
            placeholder="설명을 입력해주세요"
          />
          <Button
            color="custom"
            size="small"
            title={
              <>
                {loading ? (
                  <Spinner
                    borderSize={3}
                    color="white"
                    size={18}
                    spinColor="gray"
                  />
                ) : (
                  "업로드"
                )}
              </>
            }
            onClick={onUploadToServerButtonClick}
          />
        </div>
      </div>
    </UploadContainer>
  );
};
export default Upload;
