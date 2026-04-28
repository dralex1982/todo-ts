import {memo, useRef, useState} from "react";

interface Props {
    children: string,
    index: number,
    remove: (index: number) => void,
    edit: (index: number, text: string) => void,
}

const Task = ({children, index, remove, edit}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const textId = useRef<HTMLTextAreaElement>(null);

    const handleClickEdit = () => {
        setIsEditing(true);
    }

    const handleClickRemove = () => {
        remove(index);
    }

    const handleClickSave = () => {
        edit(index, textId.current!.value);
        setIsEditing(false);
    }

    console.log(`Task rendered: ${children}, index:${index}`);

    if (isEditing) {
        console.log(`Editing task ${index}`);
        return (
            <div className={'box'}>
                <textarea ref={textId} defaultValue={children}></textarea>
                <button onClick={handleClickSave} className={'btn success'}>Save</button>
            </div>
        )
    } else {
        return (
            <div className={'box'}>
                <div>{children}</div>
                <button onClick={handleClickEdit} className={'btn light'}>Edit</button>
                <button onClick={handleClickRemove} className={'btn red'}>Remove</button>
            </div>
        )
    }
}

export default memo(Task);