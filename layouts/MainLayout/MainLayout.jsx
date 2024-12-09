import styles from "./MainLayout.module.css";

export const MainLayout = ({ children }) => {
  return <div className={styles.background}>{children}</div>;
};
