import styles from "./Login.module.css";
import { Input } from "../shared/ui/Input/Input";
import { ButtonComponent } from "../shared/ui/Button/Button";
import { useState } from "react";
import { loginService } from "../../../services/user/login";
import Swal from "sweetalert2";
import useUserStore from "../../../store/UserStore";
import { useNavigate } from "react-router";

export const Login = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableButton(true);
    try {
      const response = await loginService(email, password);
      setDisableButton(false);

      if (response?.status === 200) {
        setUser(response.data);
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error,
          confirmButtonColor: "var(--rose)",
        });
      }
    } catch (err) {
      console.error("error", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error",
        confirmButtonColor: "var(--rose)",
      });
    }
  };
  return (
    <main className={styles["login__background"]}>
      <form className={styles["login__container"]} onSubmit={handleSubmit}>
        <h1 className={styles["login__title"]}>Inicio de sesión</h1>
        <Input
          id={"email"}
          require={true}
          label={"Correro electrónico"}
          placeholder={"imaginamos@google.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id={"password"}
          require={true}
          label={"Contraseña"}
          placeholder={"*****"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonComponent
          label={"Iniciar sesión"}
          type="submit"
          disableButton={disableButton}
        />
      </form>
    </main>
  );
};
