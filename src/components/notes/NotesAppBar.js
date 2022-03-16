import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveEntry } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);
    const handleSaveEntry = () => {
        dispatch(startSaveEntry(active));
    }
    return (
        <div className="notes__appbar">
            <span>3 de marzo de 2022</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button className="btn" onClick={handleSaveEntry}>
                    Save
                </button>
            </div>
        </div>
    )
}
