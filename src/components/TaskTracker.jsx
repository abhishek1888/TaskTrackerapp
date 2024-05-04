import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { AddTasks } from './AddTasks';
import { TaskList } from './TaskList';
import { TasksFilter } from './TasksFilter';
import { v4 as uuidv4 } from 'uuid';

export const TaskTracker = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [filteredTasks, setFilteredTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
                setTasks(data);
               
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        const filtered = tasks.filter(task => {
            if (filter === 'completed') {
                return task.completed;
            } else if (filter === 'incomplete') {
                return !task.completed;
            } else {
                return true;
            }
        });
        setFilteredTasks(filtered);
    }, [tasks, filter]);

    const handleAddTask = (title) => {
        const newTask = {
            id: uuidv4(),
            title,
            completed: false
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
  
        

        

    };

    const handleDeleteTask = (taskId) => {
        
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        // Update the indices of tasks
        const updatedTasksWithIndices = updatedTasks.map((task, index) => ({
            ...task,
            index
        }));
    
        // Set the updated tasks
        setTasks(updatedTasksWithIndices);
    
        // Filter the tasks based on the current filter
        const filtered = updatedTasksWithIndices.filter(task => {
            if (filter === 'completed') {
                return task.completed;
            } else if (filter === 'incomplete') {
                return !task.completed;
            } else {
                return true;
            }
        });
    
        // Set the filtered tasks
        setFilteredTasks(filtered);


       
        
    };

    const handleToggleTask = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );


       
    };

    const handleFilterChange = (value) => {
        setFilter(value);


    };

 
    const handleDragEnd = (result) => {

    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Create a copy of the tasks array
    const updatedTasks = [...tasks];
    // Remove the dragged task from its original position
    const draggedTask = updatedTasks.splice(sourceIndex, 1)[0];
    // Insert the dragged task into the new position
    updatedTasks.splice(destinationIndex, 0, draggedTask);

    // Update the indices of tasks
    const updatedTasksWithIndices = updatedTasks.map((task, index) => ({
        ...task,
        index
    }));

    // Set the updated tasks
    setTasks(updatedTasksWithIndices);

    // Filter the tasks based on the current filter
    const filtered = updatedTasksWithIndices.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'incomplete') {
            return !task.completed;
        } else {
            return true;
        }
    });

    // Set the filtered tasks
    setFilteredTasks(filtered);


   
    
    };
    

    

    return (
        <div className="task-tracker-form">
            <div style={{color:'white',backgroundColor:'black'}}>
            <h1>Task Tracker</h1>
            </div>
            <AddTasks onAddTask={handleAddTask} />
            <TasksFilter filter={filter} onChangeFilter={handleFilterChange} />
            <div className="filter-task-list-divider">
                <TaskList
                    tasks={filteredTasks}
                    onDeleteTask={handleDeleteTask}
                    onToggleTask={handleToggleTask}
                    onDragEnd={handleDragEnd}
                />
            </div>
        </div>
    );
};





