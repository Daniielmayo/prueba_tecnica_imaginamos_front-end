import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
const useRoomsStore = create(
  devtools(
    persist(
      (set) => ({
        rooms: [],
        setRooms: (rooms) => {
         
          set({ rooms });
        },
        clearRooms: () => {
          set({ rooms: [] });
        },
      }),
      { name: "rooms-storage", getStorage: () => localStorage }
    ),
    { name: "roomsStore" }
  )
);

export default useRoomsStore;
