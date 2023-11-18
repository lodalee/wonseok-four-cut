const SOCIAL_CONFIG = {
  kakao_client_id: import.meta.env.VITE_KAKAO_CLIENT_KEY,
  kakao_redirect_uri: import.meta.env.VITE_KAKAO_REDIRENT_URI,
  kakao_url: import.meta.env.VITE_KAKAO_URL,
  naver_client_id: import.meta.env.VITE_NAVER_CLIENT_KEY,
  naver_redirect_uri: import.meta.env.VITE_NAVER_REDIRENT_URI,
  naver_url: import.meta.env.VITE_NAVER_URL,
  google_client_id: import.meta.env.VITE_GOOGLE_CLIENT_KEY,
  google_redirect_uri: import.meta.env.VITE_GOOGLE_REDIRENT_URI,
  google_url: import.meta.env.VITE_GOOGLE_URL,
};
export const naverReAuthOptions = {
  pathname: `${SOCIAL_CONFIG.naver_url}`,
  search: `?client_id=${SOCIAL_CONFIG.naver_client_id}&redirect_uri=${SOCIAL_CONFIG.naver_redirect_uri}&response_type=code&state=naver&auth_type=reprompt`,
};
export const kakaoLinkOptions = {
  pathname: `${SOCIAL_CONFIG.kakao_url}`,
  search: `?client_id=${SOCIAL_CONFIG.kakao_client_id}&redirect_uri=${SOCIAL_CONFIG.kakao_redirect_uri}&response_type=code&state=kakao`,
};
export const naverLinkOptions = {
  pathname: `${SOCIAL_CONFIG.naver_url}`,
  search: `?client_id=${SOCIAL_CONFIG.naver_client_id}&redirect_uri=${SOCIAL_CONFIG.naver_redirect_uri}&response_type=code&state=naver`,
};

export const googleLinkOptions = {
  pathname: `${SOCIAL_CONFIG.google_url}`,
  search: `?client_id=${SOCIAL_CONFIG.google_client_id}&redirect_uri=${SOCIAL_CONFIG.google_redirect_uri}&response_type=code&state=google&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`,
};
interface socialoption {
  pathname: string;
  search: string;
}

export const socialhandler = (option: socialoption) => {
  window.location.href = `${option.pathname + option.search}`;
};

export const getErrorMessage = (status: 401 | 402 | 409 | 500) => {
  switch (status) {
    case 401:
    case 402:
      return {
        title: "접근 권한이 없습니다.",
        content: "로그인을 해주세요.",
      };
    case 409:
    case 500:
    default:
      return {
        title: "서비스에 접속할 수 없습니다.",
        content: "새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.",
      };
  }
};
