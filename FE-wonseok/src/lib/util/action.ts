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
