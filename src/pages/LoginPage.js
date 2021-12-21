import "./AuthPages.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../store/AuthContext";

const LoginPage = () => {
  const { login, errorCodeSignIn /*signOut2,*/ } = useAuthContext(); //context values from AuthContext.js
  //signOut2(); //Signing out any current user if present and no redirecting made

  const [error, SetError] = useState(null); //State handling Errors
  const [loading, SetLoading] = useState(false); //State controlling submission button

  //Input references
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //Handling Error Message
  useEffect(() => {
    switch (errorCodeSignIn) {
      case "auth/network-request-failed":
        SetError("Network Error!! Failed to login");
        break;
      case "auth/invalid-email":
        SetError("Invalid Email!! Failed to login");
        break;
      case "auth/user-disabled":
        SetError("User Disabled!! Failed to login");
        break;
      case "auth/user-not-found":
        SetError("User Not Found!! Failed to login");
        break;
      case "auth/wrong-password":
        SetError("Wrong Password!! Failed to login");
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
  }, [errorCodeSignIn]);

  //Handing Logging in
  const submitHandler = (event) => {
    SetLoading(true);
    event.preventDefault(); //Preventing browser default on form submission

    const enteredEmail = emailInputRef.current.value;
    const entered1Password = passwordInputRef.current.value;

    //Trying to signup new user asynchronously with await on signup method
    try {
      SetError("");
      SetLoading(true); //setting State to loading true to prevent pressing button severally
      login(enteredEmail, entered1Password); //Loggs in user
    } catch {
      // SetError("Failed to Log in"); //On failure to log into account
    }
    SetLoading(false); //setting State to loading false after handling submit
  };

  return (
    <div className="container">
      <form action="#" onSubmit={submitHandler}>
        <div className="title">Login</div>
        {error && <div className="inputBox button error">{error}</div>}
        <div className="inputBox underline">
          <input
            type="text"
            placeholder="Enter Your Email"
            required
            ref={emailInputRef}
          />
          <div className="underline"></div>
        </div>
        <div className="inputBox">
          <input
            type="password"
            placeholder="Enter Your Password"
            required
            ref={passwordInputRef}
          />
          <div className="underline"></div>
        </div>
        <div className="inputBox button">
          <input disabled={loading} type="submit" name="" value="Log In" />
        </div>
      </form>
      <div className="option">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
      <div className="option">
        Don't have an account? <Link to="/signup">Sign Up now</Link>
      </div>
    </div>
  );
};

export default LoginPage;
