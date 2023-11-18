import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  nickname: string;
  picture: string;
  tokens: {
    accessToken: string;
    expirationDate: string;
  };
}

const initialState: UserState = {
  email: null,
  nickname: null,
  tokens: {
    accessToken: null,
    expirationDate: null,
  },
  picture: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userSet: (state, action: PayloadAction<UserState>) => {
      const { email, nickname, tokens, picture } = action.payload;
      const { accessToken, expirationDate } = tokens;
      state.email = email;
      state.nickname = nickname;
      state.tokens = { accessToken, expirationDate };
      state.picture = picture || null;
    },
    userLogOut: (state) => {
      state.email = null;
      state.nickname = null;
      state.picture = null;
      state.tokens = { accessToken: null, expirationDate: null };
    },
  },
  extraReducers: () => {},
});
export const { userSet, userLogOut } = userSlice.actions;
export default userSlice.reducer;
