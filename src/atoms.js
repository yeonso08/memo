import { atom } from "recoil";

export const memoAtom = atom({
  key: "memos",
  default: [],
});
