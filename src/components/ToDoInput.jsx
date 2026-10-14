import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import './ToDoInput.css'

export default function ToDoInput({ onAdd }) {
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!description.trim()) return

    onAdd(description)
    setDescription('')
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="todo-input" className="icon">
          <FontAwesomeIcon icon={faBook} />
        </label>
        <input
          type="text"
          name="input"
          id="todo-input"
          className="input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  )
}
