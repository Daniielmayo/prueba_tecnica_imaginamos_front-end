import { useEffect, useState } from "react";
import { DashboardLayout } from "../../../layouts/DashboardLayout/DashboardLayout";
import { allRoomsService } from "../../../services/rooms/rooms";
import useRoomsStore from "../../../store/RoomsStore";
import { Rooms } from "./Rooms/Rooms";

export const Dashboard = () => {
  const [dataRooms, setDataRooms] = useState([]);
  const allRoomsStore = useRoomsStore((state) => state.setRooms);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rooms = await allRoomsService();
        setDataRooms(rooms.data);
        allRoomsStore(rooms.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchData();
  }, [allRoomsStore]);

  return (
    <DashboardLayout>
      <Rooms dataRooms={dataRooms} />
    </DashboardLayout>
  );
};
