interface UploadImage {
  uploadFileName: string;
  storeFileName: string;
}
type DateTime = [
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  millisecond: number
];

interface Board {
  id: number;
  title: string;
  user: UserInterface;
  createdAt: DateTime;
  modifiedAt: DateTime;
  uploadImage: UploadImage;
}

interface responseMessage {
  message: string;
  status: string;
}

interface KaKaoLoginResponse {
  data: {
    accessToken: string;
    expirationDate: string;
  };
  msg: string;
  user: UserInterface;
}

interface UserInterface {
  email: string;
  userImg: string;
  nickname: string;
}

interface LoginUserInterface extends UserInterface {
  token: string | null; // 우리 서버
  tokens?: {
    kakao?: string | null; // 카카오
    google?: string | null; //구글
    naver?: string | null; // 네이버
  };
}

interface UsersBoard {
  id: number;
  title: string;
  user: UserInterface;
  content: string;
  createdAt: DateTime;
  modifiedAt: DateTime;
  uploadImage: UploadImage;
}
interface PageData {
  totalPages: number;
  totalElements: number;
  size: number;
}
interface ResponseData {
  msg: string;
  pageable: PageData;
  result: BoardGetData[];
}

interface BoardGetData {
  user: {
    userId: number;
    userImg: string | null;
    nickname: string;
  };
  board: {
    boardId: number;
    title: string;
    content: string;
    boardImg: string | null;
  };
  createAt: string;
  modifiedAt: string;
}
interface Comment {
  id: number;
  user: UserInterface;
  createdAt: DateTime;
  modifiedAt: DateTime;
  content: string;
}

interface Post {
  id: number;
  title: string;
  nickname: string;
  content: string;
  createdAt: DateTime;
  modifiedAt: DateTime;
  // commentList: Comment[];
  uploadImage: UploadImage;
}

interface ApiResponse {
  responseMessage: string;
  statusCode: number;
}

type DelMyBoard = ApiResponse;
type MyBoardList = UsersBoard[];
type UsersBoardList = UsersBoard[];
type UserBoardDetails = Post;

export type {
  DateTime,
  DelMyBoard,
  UploadImage,
  Board,
  MyBoardList,
  UsersBoard,
  UsersBoardList,
  Post,
  Comment,
  UserBoardDetails,
  UserInterface,
  LoginUserInterface,
  KaKaoLoginResponse,
  responseMessage,
  ResponseData,
  PageData,
  BoardGetData,
};
