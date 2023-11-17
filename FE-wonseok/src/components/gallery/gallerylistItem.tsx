import {
  GalleryItemContainer,
  ItemWrraper,
  ItemBox,
} from "@/lib/style/gallery/gallery";
import { Board } from "@/lib/types/response";
import { useNavigate } from "react-router-dom";

const GalleryListItem: React.FC<Board> = (props) => {
  const { uploadImage, id } = props;
  const navigate = useNavigate();
  const onDetailsPageNavigate = () => {
    navigate(`/gallery/${id}`);
  };
  const lastItem = (
    <ItemWrraper>
      <GalleryItemContainer>
        <ItemBox>
          <img
            src={uploadImage.storeFileName}
            alt="aa"
            onClick={onDetailsPageNavigate}
          />
        </ItemBox>
      </GalleryItemContainer>
    </ItemWrraper>
  );

  return lastItem;
};

export default GalleryListItem;
