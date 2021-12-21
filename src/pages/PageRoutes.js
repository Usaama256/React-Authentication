import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignupPage";
import EditProfilePage from "./EditProfile";
import UserDashBoard from "./UserDashBoard";
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "./ForgotPassword";

const PageRoutes = () => {
  //Handling all page routing including private routes
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <UserDashBoard />
          </PrivateRoutes>
        }
      />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/editprofile"
        element={
          <PrivateRoutes>
            <EditProfilePage />
          </PrivateRoutes>
        }
      />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PageRoutes;
