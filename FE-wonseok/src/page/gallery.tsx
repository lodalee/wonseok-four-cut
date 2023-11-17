import GetGalleryList from "@/components/gallery/gallerylist";
import GalleryListMockItem from "@/components/gallery/gallerylistMockup";
import ErrorFallback from "@/routes/errorBoundary";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const GalleryContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Gallery = () => {
  const { reset } = useQueryErrorResetBoundary();
  const MockUpcontent = () =>
    [...Array(16)]
      .map((e) => (e = { ...e, id: uuidv4() }))
      .map((e) => {
        return <GalleryListMockItem key={e.id} />;
      });
  return (
    <GalleryContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<MockUpcontent />}>
          <GetGalleryList />
        </Suspense>
      </ErrorBoundary>
    </GalleryContainer>
  );
};
export default Gallery;
