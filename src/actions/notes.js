import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { LoadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewEntry = () => {
    return async (dispatch, getState) => {
        // const {uid} = getState().auth;
        // const dbRef = collection(db, uid, 'journal/notes');
        const newEntry = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        // const doc = await addDoc(dbRef, newEntry);

        dispatch(activeEntry(doc.id, newEntry));

    }
}

export const activeEntry = (id, entry) => ({
    type: types.notesActiveEntry,
    payload: {
        id,
        ...entry
    }
});

export const startLoadingEntries = (uid) => {
    return async (dispatch) => {
        const notes = await LoadNotes(uid);
        dispatch(setEntries(notes));
    }
}

export const setEntries = (notes) => ({
    type: types.notesLoadEntry,
    payload: notes
});

export const startSaveEntry = (entry) => {
    return async (dispatch, getState) => {
        if(!entry.title) {
            console.log('%c ERROR %c No se ha podido guardar!','background-color:red; color:white; border-radius:10px;','');
            return;
        }
        const {uid} = getState().auth;
        const noteToFirestore = {
            body:entry.body,
            title:entry.title,
            date:entry.date
        };

        if(entry.id === undefined){// Eliminamos este campo ya que es null, y queremos que lo genere automaticamente firestore
            const dbRef = collection(db, uid, 'journal/notes');

            await addDoc(dbRef, noteToFirestore);
            dispatch(refreshSidebarNotes(dbRef.id, noteToFirestore));
            return;
        }

        const dbRef = doc(db, uid, `journal/notes/${entry.id}`);
        try {
            await updateDoc(dbRef, noteToFirestore);
            dispatch(refreshSidebarNotes(entry.id, noteToFirestore));
        } catch (error) {
            console.error(error);
        }
    }
}

export const refreshSidebarNotes = (id, note) => ({
    type: types.notesUpdateEntry,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})