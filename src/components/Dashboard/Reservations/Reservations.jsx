import { useEffect, useState } from "react";
import { DashboardLayout } from "../../../../layouts/DashboardLayout/DashboardLayout";
import { allReservation } from "../../../../services/reservations/allReservations";
import useUserStore from "../../../../store/UserStore";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteReservation } from "../../../../services/reservations/deleteReservation";
import styles from "./Reservations.module.css";

export const Reservations = () => {
  const user = useUserStore((state) => state.user);
  const [reservations, setReservations] = useState([]);
  console.log(reservations);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allReservation();

        const userReservations = response.data.filter(
          (reservation) => reservation.userId === user.user._id
        );
        setReservations(userReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchData();
  }, [user.user._id]);

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id, user.user._id);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== id)
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
    console.log(id);
  };
  return (
    <DashboardLayout>
      <h1 className={styles["reservations__title"]}>Rersevaciones</h1>
      {reservations.length > 0 ? (
        <ul className={styles["reservatoins__contente--item"]}>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              <p>Empleado: {reservation.employeeName}</p>
              <p>Inicio: {reservation.startDateTime}</p>
              <p>Fin: {reservation.endDateTime}</p>
              <IconButton
                onClick={() => handleDelete(reservation._id)}
                sx={{ color: "var(--rose)" }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes reservas disponibes</p>
      )}
    </DashboardLayout>
  );
};
