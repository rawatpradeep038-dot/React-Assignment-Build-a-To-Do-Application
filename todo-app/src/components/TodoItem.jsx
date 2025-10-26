import { useState } from 'react'
import '../styles/TodoItem.css'

function TodoItem({ todo, onToggle, onDelete, onEdit, darkMode }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.task)
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [editDueDate, setEditDueDate] = useState(todo.dueDate)

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, {
        task: editText.trim(),
        priority: editPriority,
        dueDate: editDueDate
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.task)
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate)
    setIsEditing(false)
  }

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed

  if (isEditing) {
    return (
      <div className={`todo-item ${darkMode ? 'dark' : 'light'}`}>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
        />
        <div className="edit-controls">
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="edit-select"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="edit-date"
          />
        </div>
        <div className="edit-actions">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`todo-item ${darkMode ? 'dark' : 'light'} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-details">
          <div className={`todo-task ${todo.completed ? 'completed' : ''}`}>
            {todo.task}
          </div>
          <div className="todo-meta">
            <span className={`priority-badge ${todo.priority.toLowerCase()}`}>
              {todo.priority}
            </span>
            {todo.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                Due: {new Date(todo.dueDate).toLocaleDateString()}
                {isOverdue && ' (Overdue)'}
              </span>
            )}
          </div>
        </div>
        <div className="todo-actions">
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => onDelete(todo.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem