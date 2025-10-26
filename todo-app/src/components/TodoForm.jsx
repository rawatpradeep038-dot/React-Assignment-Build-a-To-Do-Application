import { useState } from 'react'
import '../styles/TodoForm.css'

function TodoForm({ onAdd }) {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.trim()) {
      onAdd({
        id: Date.now(),
        task: task.trim(),
        priority,
        dueDate,
        completed: false,
        createdAt: new Date().toISOString()
      })
      setTask('')
      setPriority('Medium')
      setDueDate('')
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TodoForm