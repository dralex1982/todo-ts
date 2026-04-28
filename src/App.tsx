import './App.css'
import {useCallback, useState} from "react";
import Task from "./components/Task.tsx";

function App() {
    const [tasks, setTasks] = useState<Map<number, string>>(new Map());

    console.log("App rendered");

    const deleteTask = useCallback((index: number) => {
        setTasks(prev => {
            const newTasks = new Map(prev);
            newTasks.delete(index);
            return newTasks;
        })
    }, [])

    const editTask = useCallback((index: number, text: string) => {
        setTasks(prev => {
            const newTasks = new Map(prev);
            newTasks.set(index, text);
            return newTasks;
        });
    }, [])

    const addTask = useCallback(() => {
        setTasks(new Map([...tasks]).set(Date.now(), 'New task'));
    }, [tasks])

    return (
        <div className={'field'}>
            <button className={'btn new'} onClick={addTask}>Add task</button>
            {Array.from(tasks.entries()).map(([key, value]) => (
                <Task
                    key={key}
                    index={key}
                    edit={editTask}
                    remove={deleteTask}
                >
                    {value}
                </Task>
            ))}
        </div>
    )
}

export default App
