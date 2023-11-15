import { useEffect, useState } from "react";
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

type User = { statusCode: number; responseMessage: string };

type State<T> = {
  data: T | undefined;
  error: AxiosError | undefined;
  isLoading: boolean;
  signin: (username: string, password: string) => Promise<void>;
};

const useSignin = (api: AxiosInstance): State<User> => {
  const [data, setData] = useState<User>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const cancelTokenSource = axios.CancelToken.source();
  useEffect(() => {
    return () => {
      //재요청시 취소 +_+
      cancelTokenSource.cancel();
    };
  }, []);

  const signin = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response: AxiosResponse<User> = await api.post(
        "/api/user/login",
        {
          username,
          password,
        },
        {
          cancelToken: cancelTokenSource.token,
          timeout: 5000,
        }
      );
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, isLoading, signin };
};

export default useSignin;
