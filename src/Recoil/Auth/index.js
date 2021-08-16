import { atom, selector } from "recoil";

export const userState = atom({
  key: "user",
  default: {},
});

export const loggedInState = atom({
  key: "logged_in",
  default: false,
});

export const getUserLocal = selector({
  key: "getUserLocal", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => get(userState),
});

export const getLoginState = selector({
  key: "isLoggedIn",
  get: ({ get }) => get(loggedInState),
});
