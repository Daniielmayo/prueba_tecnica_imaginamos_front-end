import { Button } from "@mui/material";

export const ButtonComponent = ({
  type = "submit",
  label,
  colorButton = "var(--rose)",
  disableButton = false,
  marginTopButton,
  onClick,
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        type={type}
        variant="contained"
        disabled={disableButton}
        sx={{
          background: colorButton,
          borderRadius: "32px",
          marginTop: marginTopButton,
        }}
      >
        {label}
      </Button>
    </>
  );
};
