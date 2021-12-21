import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./AuthPages.css";
import { useAuthContext } from "../store/AuthContext";

const EditProfilePage = () => {
  const {
    updateEmail,
    /*updatePassword,*/ errorCodeUpdateProfile,
    resetPassword,
    deleteUser,
    currentuser,
  } = useAuthContext(); //context values from AuthContext.js

  const [error, SetError] = useState(null); // State controlling Error message
  const [message, SetMessage] = useState(null);
  const [loading, SetLoading] = useState(false); //State controlling submission button

  const navigateAway = useNavigate(); //useNavigate object to handle redirecting

  //Input references
  const emailInputRef = useRef();
  // const passwordInputRef = useRef();
  // const passwordConfirmInputRef = useRef();

  //Handling Error Message
  useEffect(() => {
    switch (errorCodeUpdateProfile) {
      case "auth/network-request-failed":
        SetError("Network Error!! Failed to Update Profile");
        break;
      case "auth/invalid-email":
        SetError("Invalid Email!! Failed to Update Profile");
        break;
      case "auth/user-disabled":
        SetError("User Disabled!! Failed to Update Profile");
        break;
      case "auth/user-not-found":
        SetError("User Not Found!! Failed to Update Profile");
        break;
      case "auth/wrong-password":
        SetError("Wrong Password!! Failed to Update Profile");
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
  }, [errorCodeUpdateProfile]);

  //Handing Updating user
  const submitHandler = (event) => {
    SetLoading(true);
    event.preventDefault(); //Preventing browser default on form submission

    const enteredEmail = emailInputRef.current.value;
    // const entered1Password = passwordInputRef.current.value;
    // const entered2Password = passwordConfirmInputRef.current.value;

    if (enteredEmail !== currentuser.email) {
      updateEmail(enteredEmail);
      SetMessage("Email Changed");
    }
    // if (entered1Password !== entered2Password) {
    //   SetError("Passwords Do Not Match");
    // } else {
    //   var promises = [];
    //   if (enteredEmail !== currentuser.email) {
    //     promises.push(updateEmail(enteredEmail));
    //   }
    //   if (entered1Password && entered1Password === entered2Password) {
    //     promises.push(updatePassword(entered1Password));
    //   }
    //   Promise.all(promises)
    //     .then(() => {
    //       navigateAway("/");
    //     })
    //     .catch(() => {
    //       //SetError("Failed To Update Profile");
    //     })
    //     .finally(() => {
    //       SetLoading(false); //setting State to loading false after handling submit
    //     });
    //}
  };

  //Handling password reset
  const onPasswordReset = () => {
    resetPassword(currentuser.email);
    SetMessage("Check Your Email to Complete Password Changing");
    setTimeout(() => {
      navigateAway("/");
    }, 3000);
  };

  //Handling Delete Account
  const onDeleteProfile = () => {
    SetMessage("Profile Has Been Deleted");
    deleteUser(currentuser);
  };

  return (
    <div className="container">
      <form action="#" onSubmit={submitHandler}>
        <div className="title">Update Profile</div>
        {message && !error && <div className="inputBox message">{message}</div>}
        {error && <div className="inputBox button error">{error}</div>}
        {/*Error Message conditional display */}
        <div className="inputBox underline">
          <input
            type="text"
            placeholder="Enter Your Email"
            required
            ref={emailInputRef}
            defaultValue={currentuser.email}
          />
          <div className="underline"></div>
        </div>
        <div className="inputBox button">
          <input
            disabled={loading}
            type="submit"
            name=""
            value="Change Email"
          />
        </div>
      </form>
      <div className="btnsContainer">
        <button className="inputBox btnBlue" onClick={onPasswordReset}>
          Reset Password
        </button>
        <button className="inputBox btnRed" onClick={onDeleteProfile}>
          Delete Profile
        </button>
      </div>
      <div className="option">
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
};

export default EditProfilePage;
