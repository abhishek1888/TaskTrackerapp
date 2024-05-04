import React from 'react'

export const TasksFilter = ({ filter, onChangeFilter }) => {

    const selectStyle = {
        padding: '5px 10px',
        fontSize: '12px',
        borderRadius: '5px',
        border: '2px solid black',
        color: 'black',
    };
    return (

        <div className="filter-tasks">
            <select value={filter} style={selectStyle}
                onChange={(e) => onChangeFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
            </select>
        </div>
    );
}
