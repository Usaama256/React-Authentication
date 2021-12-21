import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
 //Firebase Configurations to be placed here
};

const FireInit = firebase.initializeApp(firebaseConfig);

export const auth = FireInit.auth();

export default FireInit;
