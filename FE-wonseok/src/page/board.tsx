import { v4 as uuidv4 } from "uuid";
import GetBoardList from "@/components/board/boardlist";
import BoardListMockItem from "@/components/board/boardlistMockup";
import { Suspense } from "react";
import { BoardContainer } from "@/lib/style/board/board";
import ErrorFallback from "@/routes/errorBoundary";
import { ErrorBoundary } from "react-error-boundary";

const Board = () => {
  const MockUpcontent = () =>
    [...Array(16)]
      .map((e) => {
        return { ...e, key: uuidv4() };
      })
      .map((e) => {
        return <BoardListMockItem key={e.key} />;
      });
  return (
    <BoardContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<MockUpcontent />}>
          <GetBoardList />
        </Suspense>
      </ErrorBoundary>
    </BoardContainer>
  );
};
export default Board;
