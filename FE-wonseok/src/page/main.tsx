import { getBoardTopFive, getUserTopFive } from "@/api/get";
import { eleven, eun, hyun, soon } from "@/assets/img";
import Carousel from "@/components/home/caroucel";
import Previewlist from "@/components/home/previewlist";
import { useAppDispatch } from "@/hooks/useRedux";
import { userLogOut } from "@/store/slice/userSlice";
import { useQuery } from "react-query";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
const WantedImg = [eun, hyun, soon, eleven];

const Main = () => {
  // 이미지 갤러리 , 보드 리스트 프리패치
  const {
    data: BoardTopfiveData,
    isError: BoardTopfiveError,
    isLoading: BoardTopfiveLoading,
    isFetching: BoardTopfiveIsFetching,
  } = useQuery("getboardTopFive", getBoardTopFive);
  const {
    data: UserTopfiveData,
    isError: UserTopfiveError,
    isLoading: UserTopfiveLoading,
    isFetching: UserTopfiveIsFetching,
  } = useQuery("getuserTopFive", getUserTopFive);

  const dispatch = useAppDispatch();

  if (UserTopfiveError || BoardTopfiveError) {
    dispatch(userLogOut());
  }
  return (
    <MainContainer>
      <Carousel images={WantedImg} />
      {BoardTopfiveData && UserTopfiveData && (
        <>
          <Previewlist title={"내 갤러리"} list={UserTopfiveData} />
          <Previewlist title={"전체 게시물"} list={BoardTopfiveData} />
        </>
      )}
    </MainContainer>
  );
};
export default Main;
