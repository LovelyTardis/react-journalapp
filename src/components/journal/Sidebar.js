import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { executeLogOut } from '../../actions/auth';
import { startNewEntry } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(executeLogOut());
    }
    const {name} = useSelector(state => state.auth);
    const displayName = useMemo(() => {
        return name
    }, [name]);

    const handleNewEntry = () => {
        dispatch(startNewEntry());
    }

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span>{displayName}</span>
                </h3>

                <button className="btn" onClick={handleLogOut}>
                    Logout
                </button>
            </div>

            <div className="journal__new-entry" onClick={handleNewEntry}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />    

        </aside>
    )
}
