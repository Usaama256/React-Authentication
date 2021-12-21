import "./AuthPages.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../store/AuthContext";

const ForgotPassword = () => {
  const { resetPassword, /*signOut2,*/ errorCodeResetPassword } =
    useAuthContext(); //context values from AuthContext.js
  //signOut2(); //Signing out any current user if present and no redirection made

  const [error, SetError] = useState();
  const [loading, SetLoading] = useState(false); //State controlling submission button
  const [message, setMessage] = useState();

  const emailInputRef = useRef();

  //Handling Error Message
  useEffect(() => {
    switch (errorCodeResetPassword) {
      case "auth/network-request-failed":
        SetError("Network Error!! Failed to Reset Password");
        break;
      case "auth/invalid-email":
        SetError("Invalid Email!! Failed to Reset Password");
        break;
      case "auth/user-disabled":
        SetError("User Disabled!! Failed to Reset Password");
        break;
      case "auth/user-not-found":
        SetError("User Not Found!! Failed to Reset Password");
        break;
      case "auth/wrong-password":
        SetError("Wrong Password!! Failed to Reset Password");
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
  }, [errorCodeResetPassword]);

  //Handing password reset
  const submitHandler = (event) => {
    SetLoading(true);
    event.preventDefault(); //Preventing browser default on form submission

    const enteredEmail = emailInputRef.current.value;

    //Trying to signup new user asynchronously with await on signup method
    try {
      setMessage("");
      SetError("");
      SetLoading(true); //setting State to loading true to prevent pressing button severally
      resetPassword(enteredEmail); //Signs in user
      setMessage("Check Your Email For Further Instructions");
      emailInputRef.current.value = null;
    } catch {
      // SetError("Failed to Reset Password"); //On failure to log into account
    }

    SetLoading(false); //setting State to loading false after handling submit
  };

  return (
    <div className="container">
      <form action="#" onSubmit={submitHandler}>
        <div className="title">Reset Password</div>
        {error && <div className="inputBox button error">{error}</div>}
        {message && !error && <div className="inputBox button">{message}</div>}
        <div className="inputBox underline">
          <input
            type="text"
            placeholder="Enter Your Email"
            required
            ref={emailInputRef}
          />
          <div className="underline"></div>
        </div>

        <div className="inputBox button">
          <input
            disabled={loading}
            type="submit"
            name=""
            value="Reset Password"
          />
        </div>
      </form>
      <div className="option">
        <Link to="/login">Log in</Link>
      </div>
      <div className="option">
        Don't have an account? <Link to="/signup">Sign Up now</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
