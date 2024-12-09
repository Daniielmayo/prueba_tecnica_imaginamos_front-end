import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => {

          set({ user: null });
        },
      }),
      { name: "user-storage", getStorage: () => localStorage }
    ),
    { name: "userStore" }
  )
);

export default useUserStore;
