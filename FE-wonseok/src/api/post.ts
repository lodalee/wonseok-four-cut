import { AxiosResponse } from "axios";
import { serverBase, serverUser } from "./server";
import { KaKaoLoginResponse, responseMessage } from "@/lib/types/response";

export const upload = async (
  formData: FormData,
  token: string
): Promise<AxiosResponse<responseMessage>> => {
  const response = await serverUser.post("/board", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}aa`,
    },
  });
  return response;
};

type signUpProp = {
  email: string;
  password: string;
};
type signInProp = {
  email: string;
  password: string;
};

export const signupSocial = async (code: string, state: string) => {
  const response = await serverBase.post(`${state}`, {
    code,
  });
  return response;
};

export const signup = async (
  params: signUpProp
): Promise<AxiosResponse<responseMessage>> => {
  const { email, password } = params;
  const response = await serverUser.post("/user/signup", {
    email,
    password,
    nickname: "은석",
  });
  return response;
};
export const signin = async (
  params: signInProp
): Promise<AxiosResponse<KaKaoLoginResponse, Error>> => {
  const { email, password } = params;
  const response = await serverUser.post(
    "/user/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return response;
};
