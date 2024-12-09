import { Navigate } from "react-router";
import useUserStore from "../../store/UserStore";
const PrivateRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
