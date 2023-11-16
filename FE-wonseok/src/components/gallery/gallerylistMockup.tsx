import {
  GalleryItemMockContainer,
  ItemMockContainer,
  ItemMockBox,
  ItemWrraper,
} from "@/lib/style/gallery/gallery";

const GalleryListMockItem = () => {
  const Mockcontent = (
    <GalleryItemMockContainer>
      <ItemMockContainer>
        <ItemMockBox />
      </ItemMockContainer>
    </GalleryItemMockContainer>
  );

  const lastItem = <ItemWrraper>{Mockcontent}</ItemWrraper>;

  return <>{lastItem}</>;
};

export default GalleryListMockItem;
