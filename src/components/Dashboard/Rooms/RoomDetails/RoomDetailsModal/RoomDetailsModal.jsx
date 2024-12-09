import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import styles from "./RoomDetailsModal.module.css";
import useUserStore from "../../../../../../store/UserStore";
import { useParams } from "react-router";
import { createReservation } from "../../../../../../services/reservations/reservations";
import Swal from "sweetalert2";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ReservationModal = ({
  open,
  handleClose,
  handleSubmit,
  roomSchedule,
}) => {
  const user = useUserStore((state) => state.user);
  const { id } = useParams();

  const [employeeName, setEmployeeName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      roomId: id,
      employeeName,
      startDateTime,
      endDateTime,
      userId: user.user._id,
    };

    try {
      const response = await createReservation(reservationData);
      console.log("Reserva creada:", response.status);
      if (response.status === 200) {
        handleSubmit(reservationData);
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Reserva creada",
          confirmButtonColor: "var(--rose)",
        });
      } else if (response.error.status === 400) {
        handleClose();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error.data.message,
          confirmButtonColor: "var(--rose)",
        });
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Crear Reserva
        </Typography>
        <form className={styles.form} onSubmit={onSubmit}>
          <TextField
            label="Nombre del Empleado"
            fullWidth
            margin="normal"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <TextField
            label="Hora de Inicio"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
          <TextField
            label="Hora de Fin"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Reservar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ReservationModal;
