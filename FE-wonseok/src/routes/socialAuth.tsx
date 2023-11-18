// import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { UserState, userSet } from "@/store/slice/userSlice";
// import { naverReAuthOptions, socialhandler } from "@/lib/util/action";
import { useAppDispatch } from "@/hooks/useRedux";
import { signupSocial } from "@/api/post";
import { AxiosResponse } from "axios";
import { KaKaoLoginResponse } from "@/lib/types/response";

const SocialAuth = () => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const token = searchParams.get("access_token");
  const dispatch = useAppDispatch();
  // console.log(code);
  const dataset = (res: AxiosResponse<KaKaoLoginResponse>): UserState => {
    const { data, user } = res.data;
    const { accessToken, expirationDate } = data;
    const { email, nickname, userImg } = user;

    switch (state) {
      // case "naver":
      //   return {
      //     id: nickname,
      //     nickname: email || "",
      //     token: token,
      //     tokens: { naver: Accesstoken },
      //     picture: profile_image,
      //   };
      case "kakao":
        return {
          email,
          nickname,
          picture: userImg || "",
          tokens: {
            accessToken,
            expirationDate,
          },
        };
      // case "google":
      //   return {
      //     id: given_name,
      //     nickname: email || "",
      //     token: token,
      //     picture: picture,
      //     tokens: { google: Accesstoken },
      //   };

      default:
        return {
          email: null,
          nickname: null,
          tokens: { accessToken: null, expirationDate: null },
          picture: null,
        };
    }
  };

  useEffect(() => {
    const socialfecth = async () => {
      const codes = code ?? token;
      try {
        const response = await signupSocial(codes, state);
        if (response.status === 200) {
          console.log(response);
          dispatch(userSet(dataset(response)));
        }
      } catch (error) {
        throw new Error("소셜로그인에 실패하셨습니다.");
      }
    };
    socialfecth();
  }, []);

  return <div>로딩중</div>;
};
export default SocialAuth;
