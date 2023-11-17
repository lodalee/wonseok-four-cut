import { DelMyBoard } from "@/lib/types/response";
import { serverUser } from "./server";
import { AxiosResponse } from "axios";

export const deleteBoard = async (
  boardId: string
): Promise<AxiosResponse<DelMyBoard>> => {
  const response = await serverUser.delete(`/api/boards/${boardId}`);
  return response;
};
export const updateBoard = async (
  boardId: string,

  data: {
    content: string;
    title: string;
  }
): Promise<AxiosResponse> => {
  console.log(data);
  const response = await serverUser.put(
    `/api/boards/${boardId}`,
    {
      ...data,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};
