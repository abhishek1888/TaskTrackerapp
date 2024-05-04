import React, { useState } from 'react'

export const WorkTask = ({ task, onDeleteTask, onToggleTask, dragHandleProps }) => {

    const cellStyle = {
        padding: '0.75rem',
        verticalAlign: 'top',
        fontWeight: 'bold',
    };

    const buttonStyle = {
        marginLeft: '5px',
        color: 'white',
        backgroundColor: 'red',
        fontWeight: 'bold',
    };


    return (

        <>
            <td style={cellStyle} {...dragHandleProps}>
                <input type="checkbox" checked={task.completed} onChange={() => onToggleTask(task.id)} />
            </td>
            <td style={cellStyle}>{task.title}</td>
            <td style={cellStyle}>
                <button className="btn btn-danger" style={buttonStyle} onClick={() => onDeleteTask(task.id)}>Delete</button>
            </td>
        </>

    );
}
