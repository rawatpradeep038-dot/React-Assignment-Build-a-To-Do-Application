import TodoItem from './TodoItem'
import '../styles/TodoList.css'

function TodoList({ todos, onToggle, onDelete, onEdit, darkMode, searchTerm }) {
  if (todos.length === 0) {
    return (
      <div className={`empty-message ${darkMode ? 'dark' : 'light'}`}>
        {searchTerm ? 'No tasks found.' : 'No tasks yet. Add one above!'}
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          darkMode={darkMode}
        />
      ))}
    </div>
  )
}

export default TodoList