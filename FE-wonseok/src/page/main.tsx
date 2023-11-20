// import { getBoardTopFive, getUserTopFive } from "@/api/get";
import PreviewMockup from "@/components/home/previewMockup";
// import Carousel from "@/components/home/caroucel";
import Previewlist from "@/components/home/previewlist";
// import { useAppDispatch } from "@/hooks/useRedux";
import ErrorFallback from "@/routes/errorBoundary";
// import { userLogOut } from "@/store/slice/userSlice";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
// const WantedImg = [eun, hyun, soon, eleven];

const Main = () => {
  // 이미지 갤러리 , 보드 리스트 프리패치

  // const {
  //   data: UserTopfiveData,
  //   isError: UserTopfiveError,
  //   // isLoading: UserTopfiveLoading,
  //   // isFetching: UserTopfiveIsFetching,
  // } = useQuery("getuserTopFive", getUserTopFive);
  const { reset } = useQueryErrorResetBoundary();
  // const dispatch = useAppDispatch();

  // if (UserTopfiveError || BoardTopfiveError) {
  //   // dispatch(userLogOut());
  // }
  return (
    <MainContainer>
      {/* <Carousel images={WantedImg} /> */}
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<PreviewMockup />}>
          {/* <Previewlist title={"내 갤러리"} list={UserTopfiveData} /> */}
          <Previewlist />
        </Suspense>
      </ErrorBoundary>
    </MainContainer>
  );
};
export default Main;
