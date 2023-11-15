import styled from "styled-components";
import PreviewMockup from "./previewMockup";
import { ThemeProps } from "@/style/theme";
import { PreviewContainer, ItemContainer } from "@/style/main/home";
import { MyBoardList } from "@/types/response";
import BoardListItem from "../board/borderlistitem";

interface PreviewList {
  list?: MyBoardList;
  title: string;
}

const Previewlist: React.FC<PreviewList> = (props) => {
  const { list, title } = props;
  const content = (
    <PreviewContainer>
      <div className="preview-logo">{title}</div>
      <div className="preview-list">
        <div className="list-view-container">
          {list ? (
            list?.map((e) => <BoardListItem {...e} key={e.id} />)
          ) : (
            <>
              <PreviewMockup />
            </>
          )}
        </div>
      </div>
    </PreviewContainer>
  );

  return content;
};
export default Previewlist;
