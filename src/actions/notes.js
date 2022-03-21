import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { LoadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { fileUpload } from "../helpers/fileUpload";
import Swal from "sweetalert2";

export const startNewEntry = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const dbRef = collection(db, uid, "journal/notes");
    const newEntry = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await addDoc(dbRef, newEntry);
    dispatch(activeEntry(doc.id, newEntry));
    dispatch(addNewEntry(doc.id, newEntry));
  };
};

export const startDeleteEntry = (id) => (dispatch, getState) => {
  const { uid } = getState().auth;
  const docRef = doc(db, uid, "journal/notes", id);
  try {
    deleteDoc(docRef);
    dispatch(deleteEntry(id));
  } catch (err) {
    console.log(err);
  }
};

export const startUploadPicture = (file) => async (dispatch, getState) => {
  const { active: activeEntry } = getState().notes;
  Swal.fire({
    title: "Uploading...",
    text: "Please wait",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
  const fileUrl = await fileUpload(file);
  activeEntry.url = fileUrl;
  dispatch(startSaveEntry(activeEntry));
  Swal.close();
};

export const startSaveEntry = (entry) => {
  return async (dispatch, getState) => {
    if (!entry.title) {
      Swal.fire("No se ha podido guardar", "Debes poner un título.", "error");
      return;
    }
    const { uid } = getState().auth;
    const noteToFirestore = {
      body: entry.body,
      title: entry.title,
      date: entry.date,
      url: entry.url || "",
    };

    const dbRef = doc(db, uid, `journal/notes/${entry.id}`);
    try {
      await updateDoc(dbRef, noteToFirestore);
      dispatch(refreshSidebarNotes(entry.id, noteToFirestore));
      Swal.fire("Note saved", entry.title, "success");
    } catch (error) {
      Swal.fire("Error", error, "error");
      console.error(error);
    }
  };
};

export const startLoadingEntries = (uid) => {
  return async (dispatch) => {
    const notes = await LoadNotes(uid);
    dispatch(setEntries(notes));
  };
};

export const addNewEntry = (id, entry) => ({
  type: types.notesNewEntry,
  payload: {
    id,
    ...entry,
  },
});

export const activeEntry = (id, entry) => ({
  type: types.notesActiveEntry,
  payload: {
    id,
    ...entry,
  },
});

export const deleteEntry = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const setEntries = (notes) => ({
  type: types.notesLoadEntry,
  payload: notes,
});

export const refreshSidebarNotes = (id, note) => ({
  type: types.notesUpdateEntry,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const logoutPurgeNotes = () => ({
  type: types.notesLogoutCleaning,
});
