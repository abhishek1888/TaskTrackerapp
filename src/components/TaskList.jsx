import React from 'react'
import { WorkTask } from './WorkTask';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const TaskList = ({ tasks, onDeleteTask, onToggleTask, onDragEnd }) => {

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        onDragEnd(result);
    };

    const tableStyle = {
        width: '100%',
        maxWidth: '100%',
        marginBottom: '1rem',
        backgroundColor: 'transparent',
        borderSpacing: '0',
        borderCollapse: 'collapse',
    };

    const tableHeadStyle = {
        backgroundColor: '#f8f9fa',
        color: '#495057',
    };


    const tableCellStyle = {
        padding: '0.75rem',
        verticalAlign: 'top',
        borderTop: '1px solid #dee2e6',
    };

    return (


        <DragDropContext onDragEnd={handleDragEnd}>
            <table style={tableStyle} className="table table-striped">
                <thead style={tableHeadStyle}>
                    <tr>
                        <th style={tableCellStyle}>Completed</th>
                        <th style={tableCellStyle}>Task</th>
                        <th style={tableCellStyle}>Action</th>
                    </tr>
                </thead>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <tbody {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                    {(provided) => (
                                        <tr
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                ...provided.draggableProps.style,
                                                backgroundColor: provided.isDragging ? '#fafafa' : 'inherit',
                                            }}
                                            className="task-list-row"
                                        >
                                             
                                            <WorkTask
                                                task={task}
                                                onDeleteTask={onDeleteTask}
                                                onToggleTask={onToggleTask}
                                                dragHandleProps={provided.dragHandleProps}
                                            />
                                        </tr>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </tbody>
                    )}
                </Droppable>
            </table>
        </DragDropContext>
    );
}
