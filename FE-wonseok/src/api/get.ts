// import { AxiosResponse } from "axios";
import axios from "axios";
import { serverUser } from "./server";
import {
  MyBoardList,
  UserBoardDetails,
  UsersBoardList,
} from "@/lib/types/response";

export const getEveryGet = async (): Promise<UsersBoardList> => {
  const response = await serverUser.get("/api/boards");
  return response.data;
};
export const getUserGet = async (): Promise<MyBoardList> => {
  try {
    const response = await serverUser.get("/api/boards/user");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios에서 생성된 에러인 경우
      if (error.response) {
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        // 요청은 성공했지만, 응답이 없음
        console.error("No response received:", error.request);
      } else {
        // 요청을 보내기 전에 에러 발생
        console.error("Error during request setup:", error.message);
      }
    } else {
      // Axios에서 생성된 에러가 아닌 경우 (네트워크 에러 이외의 에러)
      console.error("Non-Axios error occurred:", error.message);
    }
  }
};
export const getBoardTopFive = async (): Promise<MyBoardList> => {
  const response = await serverUser.get("/api/boards/top5");
  return response.data;
};
export const getUserTopFive = async (): Promise<MyBoardList> => {
  const response = await serverUser.get("/api/boards/user/top5");
  return response.data;
};

export const getDetailBoard = async (
  boardId: string
): Promise<UserBoardDetails> => {
  const response = await serverUser.get(`/api/boards/${boardId}`);
  return response.data;
};
