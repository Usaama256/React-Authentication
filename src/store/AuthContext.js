import { createContext, useContext, useState /*, useEffect */ } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthContext = createContext({
  currentuser: null,
  signUp: (SignUp) => {},
  login: (Login) => {},
  signOut1: (SignOutMain) => {},
  signOut2: (SignOutSec) => {},
  resetPassword: (ResetPassword) => {},
  deleteUser: (DeleteUser) => {},
  errorCode: null,
  errorSms: null,
}); //Creating context object, Null Propertins help in VS_Code prediction

//Creating hook to allow the use of the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const navigateAway = useNavigate(); //UseNavigate object to handle redirecting

  const [currentUser, setCurrentUser] = useState(); //Changes current user state initially null
  const [loading, setLoading] = useState(true); //Whether user is assigned or not

  //States handling error codes in sign up, sign in , sign out, password reset and update profile
  const [errorCodeSignIn, SetErrorCodeSignIn] = useState(null);
  const [errorCodeSignup, SetErrorCodeSignup] = useState(null);
  const [errorCodeResetPassword, SetErrorCodeResetPassword] = useState(null);
  const [errorCodeUpdateProfile, SetErrorCodeUpdateProfile] = useState(null);
  const [errorCodeLogOut, SetErrorCodeLogOut] = useState(null);

  //signup method that reqiures email and password, using the auth module created in firebase.js
  //And redirects the user to the private route "/"
  const SignUp = async (email, password) => {
    SetErrorCodeSignup(null);
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        //Signed in
        setCurrentUser(userCredentials.user);
        navigateAway("/");
      })
      .catch((error) => {
        SetErrorCodeSignup(error.code);
        console.log(`${error.code}: ${error.message}`);
      });
  };

  //signin method that reqiures email and password, using the auth module created in firebase.js
  //And redirects the user to the private route "/"
  const Login = async (email, password) => {
    SetErrorCodeSignIn(null);
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        //Logged in
        setCurrentUser(userCredentials.user);
        navigateAway("/");
      })
      .catch((error) => {
        SetErrorCodeSignIn(error.code);
        console.log(`${error.code}: ${error.message}`);
      });
  };

  //sign Out method
  //And redirects the user to the login page through private route "/"
  const SignOutMain = async () => {
    SetErrorCodeLogOut(null);
    return await auth
      .signOut()
      .then(() => {
        setCurrentUser();
        //Signed Out
        navigateAway("/login");
      })
      .catch((error) => {
        SetErrorCodeLogOut(error.code);
        console.log(`${error.code}: ${error.message}`);
      });
  };
  //sign Out method, No redirecting done
  const SignOutSec = () => {
    return auth.signOut(() => {
      setCurrentUser();
    });
  };

  //Resetting User Password
  const ResetPassword = async (email) => {
    SetErrorCodeResetPassword(null);
    return await auth
      .sendPasswordResetEmail(email)
      .then(() => {})
      .catch((error) => {
        SetErrorCodeResetPassword(error.code);
        console.log(`${error.code}: ${error.message}`);
      });
  };

  //Updating User Email
  const UpdateEmail = async (email) => {
    SetErrorCodeUpdateProfile(null);
    return await currentUser
      .updateEmail(email)
      .then(() => {})
      .catch((error) => {
        SetErrorCodeUpdateProfile(error.code);
        console.log(`${error.code}: ${error.message}`);
      });
  };
  //Updating User Password
  const UpdatePassword = async (password) => {
    SetErrorCodeUpdateProfile(null);
    return await currentUser
      .updatePassword(password)
      .then(() => {})
      .catch((error) => {
        SetErrorCodeUpdateProfile(error.code);
        console.log(`${error.code}: ${error.message}`);
      });
  };

  //Deleting A user
  const DeleteUser = async () => {
    return await auth.currentUser
      .delete()
      .then(() => {
        setCurrentUser(null);
        //user deleted
      })
      .catch((error) => {});
  };

  //Handling user Sign in state
  useEffect(() => {
    //onAuthStateChange monitors the user's state of Sign up, Sign in and Sign out, and changes Current user accordingly
    //Also keeps the user signed in on refreshing
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user); //setting current user
      setLoading(false); //loading false after assigning new user
    });
  }, []);

  //Context values
  const context = {
    currentuser: currentUser,
    signUp: SignUp,
    login: Login,
    signOut1: SignOutMain,
    signOut2: SignOutSec,
    resetPassword: ResetPassword,
    updateEmail: UpdateEmail,
    updatePassword: UpdatePassword,
    deleteUser: DeleteUser,
    errorCodeSignIn: errorCodeSignIn,
    errorCodeSignup: errorCodeSignup,
    errorCodeResetPassword: errorCodeResetPassword,
    errorCodeUpdateProfile: errorCodeUpdateProfile,
    errorCodeLogOut: errorCodeLogOut,
  };

  return (
    <AuthContext.Provider value={context}>
      {/*props.children */}
      {!loading && props.children}
      {/* Children are not rendered when loading is false(No user Assigned) */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
