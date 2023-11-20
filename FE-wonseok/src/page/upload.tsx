import { upload } from "@/api/post";
import useImageSelect from "@/hooks/useImageSelect";
import useInput from "@/hooks/useInput";
import { useAppSelector } from "@/hooks/useRedux";
import {
  PreviewImageContainer,
  PreviewImageItem,
  UploadContainer,
} from "@/lib/style/upload/upload";
import { Button, Input } from "@/lib/util/ui";
import Spinner from "@/lib/util/ui/spinner";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "@/components/upload/FrameDropZone";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const PreviewImageCard = ({
  image,
  handleDelPreviewImage,
}: PreviewImageProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { image },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <PreviewImageItem ref={drag}>
      <div className="delbtn">
        <Button
          color="custom"
          title={<>삭제</>}
          size="small"
          onClick={() => handleDelPreviewImage(image)}
        />
      </div>
      <img src={image} alt="asad" />
    </PreviewImageItem>
  );
};
interface PreviewImageProps {
  image: string;
  handleDelPreviewImage: (image: string) => void;
}

const Upload = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const handleDelPreviewImage = useCallback(
    (image: string) => {
      const previewImageArray = previewImage.filter((e) => e !== image);
      setPreviewImage(previewImageArray);
      console.log(previewImage.length);
      if (previewImage.length === 1) {
        setPreviewImage(null);
      }
    },
    [previewImage, setPreviewImage]
  );

  const onUploadToServerButtonClick = useCallback(async () => {
    setLoading(true);

    const canvas = canvasRef.current;
    console.log(canvas);
    if (!canvas) {
      alert("캔버스가 초기화되지 않았습니다.");
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

    // 캔버스에서 데이터 URL을 가져옴
    const dataURL = canvas.toDataURL("image/png");

    // 데이터 URL을 Blob 객체로 변환
    const blob = await (await fetch(dataURL)).blob();

    // Blob 객체를 FormData에 추가
    const formData = new FormData();
    formData.append("photos", blob);
    formData.append(
      "board",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );

    try {
      const response = await upload(formData, token);
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/gallery");
      }
    } catch (error) {
      console.error(error);
      alert("실패");
    } finally {
      setLoading(false);
    }
  }, [canvasRef, title, content, token, navigate]);
  return (
    <UploadContainer previewImage={!!previewImage}>
      <div className="uploaddiv">
        <div className="upload-left-container">
          {/* 이미지업로드 */}
          <div className="upload-Container">
            <div className="pictureContainer">
              <input
                type="file"
                ref={inputRef}
                onChange={onUploadImage}
                style={{ display: "none" }}
                multiple
              />
              {previewImage ? (
                <PreviewImageContainer>
                  {previewImage.map((image) => (
                    <PreviewImageCard
                      handleDelPreviewImage={handleDelPreviewImage}
                      image={image}
                      key={uuidv4()}
                    />
                  ))}
                </PreviewImageContainer>
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
          </div>
          {/* 이미지 드래그앤드롭 */}
        </div>
        <Frame ref={canvasRef} />

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
      <div className="makeImg"></div>
    </UploadContainer>
  );
};
export default Upload;
