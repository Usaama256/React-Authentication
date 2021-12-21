import { useAuthContext } from "../store/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { currentuser } = useAuthContext();
  //Redirecting user to Log in page whenever not logged in
  return currentuser ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
