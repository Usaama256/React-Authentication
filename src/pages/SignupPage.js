import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./AuthPages.css";
import { useAuthContext } from "../store/AuthContext";

const SignUpPage = () => {
  const { signUp, /*signOut2,*/ errorCodeSignup } = useAuthContext(); //signup method from AuthContext.js
  //signOut2(); //Signing out any current user if present and no redirection made

  const [error, SetError] = useState(null); // State controlling Error message
  const [loading, SetLoading] = useState(false); //State controlling submission button

  //Input references
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  //Handling Error Message
  useEffect(() => {
    switch (errorCodeSignup) {
      case "auth/network-request-failed":
        SetError("Network Error!! Failed to Create Account");
        break;
      case "auth/invalid-email":
        SetError("Invalid Email!! Failed to Create Account");
        break;
      case "auth/user-disabled":
        SetError("User Disabled!! Failed to Create Account");
        break;
      case "auth/user-not-found":
        SetError("User Not Found!! Failed to Create Account");
        break;
      case "auth/wrong-password":
        SetError("Wrong Password!! Failed to Create Account");
        break;
      case "auth/weak-password":
        SetError("Weak Password!! Password must have atleast 6 characters");
        break;
      case "auth/invalid-password":
        SetError(
          "Wrong Password Format!! Password must have atleast 6 characters"
        );
        break;
      case "auth/too-many-requests":
        SetError("Too Many Requests!! Operation Failed");
        break;
      default:
        SetError(null);
    }
  }, [errorCodeSignup]);

  //Handing Submission on new user
  const submitHandler = (event) => {
    SetLoading(true);
    event.preventDefault(); //Preventing browser default on form submission

    const enteredEmail = emailInputRef.current.value;
    const entered1Password = passwordInputRef.current.value;
    const entered2Password = passwordConfirmInputRef.current.value;

    if (entered1Password === entered2Password) {
      //Trying to signup new user asynchronously with await on signup method
      try {
        SetLoading(true); //setting State to loading true to prevent pressing button severally
        SetError(""); // Setting error back to null
        signUp(enteredEmail, entered1Password); //Creates account
      } catch {
        //SetError("Failed To Create Account"); //On failure to create account
      }
    } else {
      SetError("Passwords Do Not Match");
    }

    SetLoading(false); //setting State to loading false after handling submit
  };

  return (
    <div className="container">
      <form action="#" onSubmit={submitHandler}>
        <div className="title">Sign Up</div>
        {error && <div className="inputBox button error">{error}</div>}{" "}
        {/*Error Message conditional display */}
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
        <div className="inputBox">
          <input
            type="password"
            placeholder="Confirm Your Password"
            required
            ref={passwordConfirmInputRef}
          />
          <div className="underline"></div>
        </div>
        <div className="inputBox button">
          <input disabled={loading} type="submit" name="" value="Sign Up" />
        </div>
      </form>
      <div className="option">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
