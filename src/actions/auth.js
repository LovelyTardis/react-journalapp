import { types } from "../types/types";
import { googleAuthProvider, auth } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { setLoading, unsetLoading } from "./ui";
import Swal from "sweetalert2";
import { logoutPurgeNotes } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(setLoading());
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(unsetLoading());
      })
      .catch((e) => {
        dispatch(unsetLoading());
        console.dir(e);
        Swal.fire("Failed to login", e.message, "error");
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(setLoading());
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(unsetLoading());
      })
      .catch((e) => {
        dispatch(unsetLoading());
        Swal.fire(
          "Failed to register",
          e.customData._tokenResponse.error.message.replace("_", " "),
          "error"
        );
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
        Swal.fire("Failed to login", e.message, "error");
      });
  };
};

export const executeLogOut = () => {
  return async (dispatch) => {
    await signOut(auth)
      .then(() => {
        dispatch(logOut());
        dispatch(logoutPurgeNotes());
      })
      .catch((error) => console.log(error));
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const logOut = () => ({
  type: types.logout,
});
