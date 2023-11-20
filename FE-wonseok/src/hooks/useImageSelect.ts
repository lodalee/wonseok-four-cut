import { useState, useCallback, useRef } from "react";

const useImageSelect = () => {
  const [previewImage, setPreviewImage] = useState<string[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const imagesArray: string[] = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // 이미지의 데이터 URL을 배열에 추가
          imagesArray.push(reader.result as string);

          // 마지막 파일일 경우 전체 이미지 배열을 설정
          if (i === e.target.files.length - 1) {
            setPreviewImage(imagesArray);
          }
        };
        reader.readAsDataURL(e.target.files[i]);
      }
    },
    []
  );

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return {
    inputRef,
    onUploadImage,
    onUploadImageButtonClick,
    previewImage,
    setPreviewImage,
  };
};

export default useImageSelect;
