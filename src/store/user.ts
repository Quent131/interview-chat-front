import { create } from "zustand";

interface UserStore {
  username: string | undefined;
  color: string | undefined;
  setUserInfos: (username: string, color: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  username: undefined,
  color: undefined,
  setUserInfos: (username, color) => set({ username, color }),
}));
