import {
  Register,
  Main,
  Detail,
  Setting,
  SignIn,
  Gallery,
  Board,
  Upload,
} from "@/page";
import { Routes, Route } from "react-router-dom";
import { LoginLayout, MainLayout } from "@/layout";
import NotAuthRoutes from "./authRoute";
import ProtectedRoutes from "./protectRoute";
import ErrorPage from "./404";
import { useAppSelector } from "@/hooks/useRedux";
import BoardDetail from "@/page/boarddetail";

const Nav = () => {
  const user = useAppSelector((state) => Boolean(state.user.token));
  return (
    <Routes>
      {/* NotAuth */}
      <Route element={<NotAuthRoutes user={true} />}>
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route path={"/*"} element={<ErrorPage />} />

      {/* 개인정보가 담긴 요청은 헤더 쿠키에 토큰이 담겨서 요청이되는데 만약에 시간이 지나서 쿠키에 토큰이 없으면
      500에러를 반환하게 500에러를 반환하면 dispatch를 통해서 
    */}

      {/* yesAuth */}
      <Route element={<ProtectedRoutes user={true} />}>
        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<Detail />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:boardId" element={<BoardDetail />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/gallery/upload" element={<Upload />} />
        </Route>
      </Route>

      {/* 404 handler */}
    </Routes>
  );
};

export default Nav;
