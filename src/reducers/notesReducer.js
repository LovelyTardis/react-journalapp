import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActiveEntry:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notesNewEntry:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case types.notesLoadEntry:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.notesUpdateEntry:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
        notes: [],
      };
    default:
      return state;
  }
};
