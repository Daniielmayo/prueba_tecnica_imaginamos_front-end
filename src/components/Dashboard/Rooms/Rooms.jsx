import { CardComponent } from "../../shared/ui/card/Card";
import styles from "./Rooms.module.css";
export const Rooms = (dataRooms) => {

  return (
    <main>
      <h1 className={styles["rooms__title"]}>Salas disponibles</h1>
      <section className={styles["rooms__content-card"]}>
        {dataRooms.dataRooms.map((room, index) => (
          <div key={index}>
            <CardComponent
              id={room.roomId}
              name={room.name}
              maxCapacity={room.maxCapacity}
              availability={room.schedule}
            />
          </div>
        ))}
      </section>
    </main>
  );
};
