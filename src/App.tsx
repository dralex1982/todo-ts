import './App.css'
import {useCallback, useState} from "react";
import Task from "./components/Task.tsx";

type Task = {
    id: number;
    text: string;
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    console.log("App rendered");

    const deleteTask = useCallback((index: number) => {
        setTasks(prev =>
            prev.filter(task =>
                task.id != index
            )
        );
    }, [])

    const editTask = useCallback((index: number, text: string) => {
        setTasks(prev =>
            prev.map((task) =>
                task.id === index
                    ? {...task, text}
                    : task
            )
        );
    }, [])

    const addTask = useCallback(() => {
        const newTask = {
            id: Date.now(),
            text: 'New task'
        }

        setTasks(prev => [...prev, newTask])
    }, [tasks])

    return (
        <div className={'field'}>
            <button className={'btn new'} onClick={addTask}>Add task</button>
            {tasks.map(t => (
                <Task
                    key={t.id}
                    index={t.id}
                    edit={editTask}
                    remove={deleteTask}
                >
                    {t.text}
                </Task>))}
        </div>
    )
}

export default App
