import { useEffect, useState } from "react";
import { DashboardLayout } from "../../../../../layouts/DashboardLayout/DashboardLayout";
import { allRoomsService } from "../../../../../services/rooms/rooms";
import { ButtonComponent } from "../../../shared/ui/Button/Button";
import styles from "./RoomDetails.module.css";
import { useParams } from "react-router";
import ReservationModal from "./RoomDetailsModal/RoomDetailsModal";

export const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [groupedReservations, setGroupedReservations] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  const roomId = id;

  useEffect(() => {
    fetchRoomAvailability();
  }, [roomId]);

  const fetchRoomAvailability = async () => {
    try {
      const response = await allRoomsService();

      const rooms = response.data;
      const roomData = rooms.find((room) => room.roomId === roomId);

      if (roomData) {
        setRoom(roomData);
        const grouped = groupReservationsByDate(roomData.reservations);
        setGroupedReservations(grouped);
      } else {
        console.error("Room not found");
      }
    } catch (error) {
      console.error("Error loading room availability:", error);
    }
  };

  const groupReservationsByDate = (reservations) => {
    const grouped = {};

    Object.keys(reservations).forEach((date) => {
      grouped[date] = reservations[date].map((reservation) => ({
        ...reservation,
        startDateTime: new Date(reservation.startDateTime),
        endDateTime: new Date(reservation.endDateTime),
      }));
    });

    return grouped;
  };

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmitReservation = (reservation) => {
    reservation;
  };
  return (
    <DashboardLayout>
      <div className={styles["RoomDeatils__container--top"]}>
        <h1 className={styles["RoomDeails__title"]}>
          {room ? room.name : "Cargando..."}
        </h1>
        <ButtonComponent label="Crear reserva" onClick={handleOpenModal} />
      </div>

      <div className={styles["RoomDetails__reservations"]}>
        <h2>Reservas de la Sala</h2>
        <p>
          Esta sala solo se puede reservar entre las horas de{" "}
          <span> {room ? room.schedule.start : "Cargando..."}</span> -{" "}
          <span>{room ? room.schedule.end : "Cargando..."}</span>
        </p>
        {groupedReservations.length === 0 ? (
          <p>No hay reservas disponibles.</p>
        ) : (
          Object.keys(groupedReservations).map((date) => (
            <div key={date} className={styles["RoomDetails__dateGroup"]}>
              <h3>{date}</h3>
              <ul>
                {groupedReservations[date].map((reservation) => (
                  <li key={reservation._id}>
                    <p>
                      <strong>{reservation.employeeName}</strong>
                    </p>
                    <p className={styles["roomDetails__time"]}>
                      Hora de inicio: {formatTime(reservation.startDateTime)}
                    </p>
                    <p className={styles["roomDetails__time"]}>
                      Hora de fin: {formatTime(reservation.endDateTime)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <ReservationModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitReservation}
        roomSchedule={room ? room.schedule : ""}
      />
    </DashboardLayout>
  );
};
