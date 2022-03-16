import { types } from "../types/types";


export const setError = (msgError) => ({
    type: types.uiSetError,
    payload: msgError
})

export const unsetError = () => ({
    type: types.uiUnsetError
})

export const setLoading = () => ({
    type: types.uiSetLoading
})

export const unsetLoading = () => ({
    type: types.uiUnsetLoading
})