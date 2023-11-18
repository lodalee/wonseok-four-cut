import styled from "styled-components";
import { useQuery } from "react-query";
import { getUserGet } from "@/api/get";
import { MyBoardList } from "@/lib/types/response";
import GalleryListItem from "./gallerylistItem";
// import { useAppDispatch } from "@/hooks/useRedux";
// import { userLogOut } from "@/store/slice/userSlice";
const GetGalleryListContainer = styled.div`
  .listPostContainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    /* justify-content: flex-start; */
    align-items: stretch; // Add this
    align-content: stretch; // Add this
  }
`;

const GetGalleryList = () => {
  const { data, isError } = useQuery<MyBoardList, Error>(
    "gallery",
    getUserGet,
    { suspense: true }
  );
  // const dispatch = useAppDispatch();

  if (isError) {
    // dispatch(userLogOut());
  }
  return (
    <GetGalleryListContainer>
      <div className="listPostContainer">
        {data.map((item) => (
          <GalleryListItem key={item.id} {...item} />
        ))}
      </div>
    </GetGalleryListContainer>
  );
};
export default GetGalleryList;
