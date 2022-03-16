import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetLoading:
            return {
                ...state,
                loading: true
            }
        case types.uiUnsetLoading:
            return {
                ...state,
                loading: false
            }
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case types.uiUnsetError:
            return {
                ...state,
                msgError: null
            }
        default:
            return state;
    }
}