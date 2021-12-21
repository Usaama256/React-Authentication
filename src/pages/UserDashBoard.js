import classes from "./UserDashBoard.module.css";
import { useAuthContext } from "../store/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashBoard = () => {
  const navigateAway = useNavigate(); //useNavigate object to redirect user if neccessay

  const { currentuser, errorCodeLogOut, signOut1 } = useAuthContext(); //context values from AuthContext.js

  const [error, SetError] = useState();

  //Handling Error Message
  useState(() => {
    switch (errorCodeLogOut) {
      case "auth/network-request-failed":
        SetError("Network Error!! Failed to Log Out");
        break;
      case "auth/invalid-email":
        SetError("Invalid Email!! Failed to Log Out");
        break;
      case "auth/user-disabled":
        SetError("User Disabled!! Failed to Log Out");
        break;
      case "auth/user-not-found":
        SetError("User Not Found!! Failed to Log Out");
        break;
      case "auth/wrong-password":
        SetError("Wrong Password!! Failed to Log Out");
        break;
      case "auth/weak-password":
        SetError("Weak Password!! Password must have atleast 6 characters");
        break;
      case "auth/too-many-requests":
        SetError("Too Many Requests!! Operation Failed");
        break;
      default:
        SetError(null);
    }
  }, [errorCodeLogOut]);

  //Method handling user log out
  const logOutHandler = () => {
    try {
      SetError("");
      signOut1(); //Signing out the current user and redirects user to log in page
    } catch {
      // SetError("Failed to Log Out");
    }
  };

  return (
    <>
      <div className={classes.container}>
        <h2>User Profile</h2>
        {error && <div className={classes.error}>{error}</div>}
        <h5>Email: {currentuser.email}</h5>
        <h5>Name: {currentuser.displayName}</h5>
        <h5>Verified: {currentuser.emailVerified}</h5>
        <h5>Id: {currentuser.uid}</h5>
        <button
          className={classes.btnEditProfile}
          onClick={() => {
            navigateAway("/editprofile");
          }}
        >
          Edit Profile
        </button>
      </div>

      <div className={classes.logout} onClick={logOutHandler}>
        Log out
      </div>
    </>
  );
};

export default UserDashBoard;
