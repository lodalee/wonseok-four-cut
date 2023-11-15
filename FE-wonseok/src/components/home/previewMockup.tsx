import { ItemMockContainer } from "@/style/main/home";
import { v4 as uuidv4 } from "uuid";

const PreviewMockup = () => {
  const ItemContent = (key: string) => (
    <ItemMockContainer key={key}>
      <div className="item-wrraper">
        <div className="item-img-container"></div>
        <div className="item-title-container">
          <div className="mock-title"></div>
        </div>
      </div>
    </ItemMockContainer>
  );

  return (
    <>
      {[...Array(5)]
        .map((e) => {
          return { key: uuidv4() };
        })
        .map((e) => ItemContent(e.key))}
    </>
  );
};
export default PreviewMockup;
