import { useMemo, useRef, useState } from 'react'
import './App.css'
import Section from './components/Section'
import ToDoContainer from './components/ToDoContainer'
import ToDoInput from './components/ToDoInput'

function App() {
  const [list, setList] = useState([])
  const nextTaskId = useRef(1)
  const [filter,setFilter] = useState('All')

  const handleAddTask = (description) => {
    const newTask = {
      id: nextTaskId.current++,
      description,
      isCompleted: false
    }

    setList((currentList) => [...currentList, newTask])
  }

  const filteredTodos = useMemo(()=> {
    let todos
    switch (filter) {
      case 'Done':
        todos = list.filter((task) => task.isCompleted)
        break
      case 'Pending':
        todos = list.filter((task) => !task.isCompleted)
        break
      default:
        todos = [...list].sort((first, second) =>
          Number(second.isCompleted) - Number(first.isCompleted) ||
          first.id - second.id
        )
    }
    return todos
  }, [list,filter])

  const updateList = (updatedTask) => {
    const updatedList = list.map((task) => {
      if(task.id === updatedTask.id) {
        return updatedTask
      }
      return task
    })
    setList(updatedList)
  }

  const deleteTask = (taskId) => {
    const updatedList = list.filter((task) => task.id !== taskId)
    setList(updatedList)
  }

  

  return (
    <>
      <div className="container">
        <Section text="ToDo Input">
          <ToDoInput onAdd={handleAddTask} />
        </Section>

        <Section text="To Do List">
          {list.length > 0 && (
            <div className='filter-buttons'>
              <button 
                onClick={() => setFilter('All')} 
                className={filter === 'All' ? 'active' : ''} 
              >
                All
              </button>

              <button 
                onClick={() => setFilter('Done')} 
                className={filter === 'Done' ? 'active' : ''} 
              >
                Done
              </button>

              <button 
                onClick={() => setFilter('Pending')} 
                className={filter === 'Pending' ? 'active' : ''} 
              >
                Pending
              </button>
            </div>
          )}
        </Section>

        <Section>
          <ToDoContainer 
            list={filteredTodos} 
            onUpdateList={updateList} 
            onDeleteTask={deleteTask} 
          />
        </Section>
      </div>
    </>
  )
}

export default App
