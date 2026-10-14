import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import Dialog from './Dialog'
import './ToDo.css'

export default function ToDo({ todo, onUpdate, onDelete }) {

    const[isEditing, setIsEditing] = useState(false)
    const[task, setTask] = useState(todo)
    const [dialogAction, setDialogAction] = useState(null)
    const [descriptionError, setDescriptionError] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

    const handleEdit = () => {
        if(task.isCompleted)
            return;

        setIsEditing(true)
    }

    const handleConfirmEdit = () => {
        if (!task.description.trim()) {
            setDescriptionError('Description cannot be empty.')
            return
        }
        setDialogAction('edit')
    }

    const confirmEdit = () => {
        if (!task.description.trim()) {
            setDescriptionError('Description cannot be empty.')
            setDialogAction(null)
            return
        }
        if (task.description !== todo.description) {
            onUpdate(task)
        }
        setIsEditing(false)
        setDialogAction(null)
        setDescriptionError('')
    }

    const handleCancelEdit = () => {
        setTask(todo)
        setIsEditing(false)
        setDescriptionError('')
    }

    const handleChange = (e) => {
        const description = e.target.value
        setTask({
            ...task,
            description
        })
        if (description.trim()) setDescriptionError('')
    }

    const handleDelete = () => {
       setDialogAction('delete')
    }

    const confirmDelete = () => {
       onDelete(task.id)
       setDialogAction(null)
    }

    const handleMarkAsDone = () => {
        const updatedTask = {
            ...task,
            isCompleted: true
        }
        setIsEditing(false)
        setTask(updatedTask)
        onUpdate(updatedTask)
    }

    return (
        <>
            <div className="todo">
                <input
                    type="checkbox"
                    className="completion-checkbox"
                    checked={task.isCompleted}
                    onChange={handleMarkAsDone}
                    disabled={task.isCompleted || isEditing}
                    aria-label={`Mark "${task.description}" as completed`}
                />
                <input
                    type="text"
                    name="task"
                    id={`task-${task.id}`}
                    className={`task ${task.isCompleted ? 'completed' : ''}`}
                    value={task.description}
                    title={task.description}
                    onChange={handleChange}
                    ref={inputRef}
                    disabled={!isEditing || task.isCompleted}
                />
                <div className='task-buttons'>
                    {isEditing ? (
                        <>
                            <button onClick={handleCancelEdit}>
                                <FontAwesomeIcon icon={faXmark} />
                                <span>Cancel</span>
                            </button>
                            <button onClick={handleConfirmEdit} disabled={!task.description.trim()}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                                <span>Confirm</span>
                            </button>
                        </>
                    ) : (
                        <>
                            {!task.isCompleted && (
                                <button onClick={handleEdit}>
                                    <FontAwesomeIcon icon={faPen} />
                                    <span>Edit</span>
                                </button>
                            )}

                            {task.isCompleted && (
                               <button onClick={handleDelete}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>Delete</span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
            {isEditing && !task.description.trim() && (
                <p 
                    id={`task-${task.id}-error`} 
                    className="task-validation">
                    {descriptionError || 'Description cannot be empty.'}
                </p>
            )}
            <Dialog
                isOpen={dialogAction !== null}
                heading={dialogAction === 'delete' ? 'Delete todo?' : 'Confirm description change'}
                confirmLabel={dialogAction === 'delete' ? 'Delete' : 'Save'}
                onCancle={() => setDialogAction(null)}
                onConfirm={dialogAction === 'delete' ? confirmDelete : confirmEdit}
            >
                {dialogAction === 'delete' ? (
                    <p>Are you sure you want to delete "{task.description}"?</p>
                ) : (
                    <>
                        <p>Save this description?</p>
                        <p>{task.description}</p>
                    </>
                )}
            </Dialog>
        </>
    )
}