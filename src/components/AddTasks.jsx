import React, { useState } from 'react'

export const AddTasks = ({ onAddTask }) => {
    const [title, setTitle] = useState('');

    const handleAddTask = () => {
        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }
        onAddTask(title);
        setTitle('');
    };
    const inputStyle = {
        marginRight: '10px',
        marginBottom: '10px',
        border: '2px solid green',
        fontWeight: 'bold',
        height: '25px',
    };

    const buttonStyle = {
        color: 'white',
        backgroundColor: 'green',
        fontWeight: 'bold',
    };

    return (

        <div className="add-task">
            <input
                type="text"
                placeholder="Add new task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
                className="form-control"
            />
            <button
                style={buttonStyle}
                className="btn"
                onClick={handleAddTask}
            >
                Add
            </button>
        </div>
    );
}
