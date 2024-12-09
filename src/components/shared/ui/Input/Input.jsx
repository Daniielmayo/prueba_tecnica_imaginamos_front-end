import { TextField } from "@mui/material";

export const Input = ({
  id,
  label,
  placeholder,
  required = false,
  colorInput = "var(--white)",
  value,
  onChange,
  type = "text",
}) => {
  return (
    <>
      <TextField
        required={required}
        id={id}
        label={label}
        placeholder={placeholder}
        variant="outlined"
        value={value}
        onChange={onChange}
        type={type}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: colorInput },
            "&:hover fieldset": { borderColor: colorInput },
            "&.Mui-focused fieldset": { borderColor: colorInput },
          },
          "& .MuiInputLabel-root": { color: colorInput },
          "& .MuiInputBase-input": { color: colorInput },
        }}
      />
    </>
  );
};
