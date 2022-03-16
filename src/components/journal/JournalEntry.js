import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeEntry } from '../../actions/notes';

export const JournalEntry = ({id, title, body, date, url}) => {
    const entryDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(activeEntry(id, {date, title, body, url}))
    }

    return (
        <div className="journal__entry pointer" onClick={handleEntryClick}>
            
            {
                url ?
                <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
                ></div>:
                <div 
                className="journal__entry-picture"
                ></div>
            
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{entryDate.format('dddd')}</span>
                <h4>{entryDate.format('Do')}</h4>
            </div>

        </div>
    )
}
