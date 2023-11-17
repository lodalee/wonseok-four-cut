// import { AxiosResponse } from "axios";
import { server } from "./server";
import {
  MyBoardList,
  UserBoardDetails,
  UsersBoardList,
} from "@/lib/types/response";

export const getEveryGet = async (): Promise<UsersBoardList> => {
  const response = await server.get("/api/boards");
  return response.data;
};
export const getUserGet = async (): Promise<MyBoardList> => {
  const response = await server.get("/api/boards/user");
  return response.data;
};
export const getBoardTopFive = async (): Promise<MyBoardList> => {
  const response = await server.get("/api/boards/top5");
  return response.data;
};
export const getUserTopFive = async (): Promise<MyBoardList> => {
  const response = await server.get("/api/boards/user/top5");
  return response.data;
};

export const getDetailBoard = async (
  boardId: string
): Promise<UserBoardDetails> => {
  const response = await server.get(`/api/boards/${boardId}`);
  return response.data;
};
