import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config"



export const LoadNotes = async (uid) => {
    const dbRef = collection(db, uid, 'journal/notes');
    const noteSnap = await getDocs(dbRef);
    const notes = [];
    
    noteSnap.forEach(note => {
        notes.push({
            id: note.id,
            ...note.data()
        })
    });
    return notes;
}