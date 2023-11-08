import { useState } from "react";
import { Todo } from "./model"

interface TodoEntryProps {
  todo: Todo
  updateFunction: (id: number, newValue: Todo) => void
  removeFunction: (id: number) => void
}

export default function TodoEntry(props: TodoEntryProps): JSX.Element {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(props.todo.todo);


    const exitEditMode = () => {
        props.updateFunction(props.todo.id, {...props.todo, todo: description})
        setEditMode(false)
    }

    let descriptionElement: JSX.Element;
    if(editMode) {
        descriptionElement = <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            onKeyDown={(event) => {
                if(event.key === "Enter") {
                    // Enter key was pressed
                    event.preventDefault();
                    exitEditMode();
                }
            }}></input>
    } else {
        descriptionElement = <p>{props.todo.todo}</p>
    }
    
    return (
        <div style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            backgroundColor: "gray",
            display: "flex"
        }}>
          {descriptionElement}
          {(!editMode ? 
            <button onClick={() => setEditMode(true)}>Update</button> :
            <button onClick={() => {
                exitEditMode();
            }}>Set new description</button>)}
          <button onClick={() => props.removeFunction(props.todo.id)}>Remove</button>
        </div>
    )
}
