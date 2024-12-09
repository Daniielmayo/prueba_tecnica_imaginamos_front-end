import { Button } from "@mui/material";
import styles from "./NotFound.module.css";
import { NavLink } from "react-router";

export const NotFound = () => {
  return (
    <main className={styles["notfound__background"]}>
      <section className={styles["notfound__image"]}>
        <h2 className={styles["notfound__info--error"]}>404 </h2>
      </section>
      <section className={styles["notfound__info"]}>
        <div className={styles["notfund__info--title"]}>
          <h2>Iteremos tu </h2>
          <h2>navegación</h2>
        </div>
        <p className={styles["notfound__info--paragraph"]}>
          Te hemos perdido; pero en Imaginamos creemos que todos los procesos de
          tecnología pueden ser iterados o testeados en pro de corregir el
          camino, por esta razón te invitamos a retomar tu navegación.
        </p>
        <NavLink to="/" end>
          <Button
            variant="contained"
            className={styles["notfound__button"]}
            sx={{ background: "var(--rose)", borderRadius: "32px" }}
          >
            Reservar sala
          </Button>
        </NavLink>
      </section>
    </main>
  );
};
