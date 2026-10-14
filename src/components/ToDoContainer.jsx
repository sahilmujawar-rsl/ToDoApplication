import ToDo from './ToDo'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import './ToDoContainer.css'

export default function ToDoContainer({list, onUpdateList, onDeleteTask}) {
    

    return <>
        <div className='todo-container'>
          {
            list.length == 0 ?  
                <>
                    <h1 className='no-tasks-header'>
                        No todo is available
                    </h1>
                    <div className="empty-box">
                        <FontAwesomeIcon icon={faBoxOpen} className='empty-box-icon'/>
                    </div>
                </>
                : 
                list.map((item) => (
                    <ToDo 
                        key={item.id} 
                        todo={item} 
                        onUpdate={onUpdateList} 
                        onDelete={onDeleteTask} 
                    />
            ))
          }
        </div>
    </>
}