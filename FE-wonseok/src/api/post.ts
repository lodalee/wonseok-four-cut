import { serverBase, serverUser } from "./server";

export const upload = async () => {
  const response = await serverUser.post(
    "/api/boards",
    {},
    { withCredentials: true }
  );
  return response;
};

type signUpProp = {
  username: string;
  password: string;
};
type signInProp = {
  username: string;
  password: string;
};

export const signupSocial = async (code: string, state: string) => {
  const response = await serverBase.post(`${state}`, {
    code,
  });
  return response;
};

export const signup = async (params: signUpProp) => {
  const { username, password } = params;
  const response = await serverUser.post("/api/user/signup", {
    username: `${username}`,
    password: `${password}`,
  });
  return response;
};
export const signin = async (params: signInProp) => {
  const { username, password } = params;
  const response = await serverUser.post(
    "/api/user/login",
    {
      username: `${username}`,
      password: `${password}`,
    },
    { withCredentials: true }
  );

  return response;
};
