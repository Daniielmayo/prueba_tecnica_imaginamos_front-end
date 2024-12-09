import { Card, CardContent, Typography, Box } from "@mui/material";
import { ButtonComponent } from "../Button/Button";
import { useNavigate } from "react-router";

export const CardComponent = ({ id, name, availability = {}, maxCapacity }) => {
  const { start, end } = availability;
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(`/dashboard/room/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345, margin: 2, background: "var(--black)" }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: "var(--rose)" }}>
          {name}
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" sx={{ color: "var(--white)" }}>
            <strong>Disponibilidad:</strong> {start} - {end}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--white)" }}>
            <strong>Capacidad máxima:</strong> {maxCapacity}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <ButtonComponent
            type="submit"
            label={"Reservar sala"}
            onClick={handleReserve}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
