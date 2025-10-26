import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import FilterSort from './components/FilterSort'
import { loadTodos, saveTodos, loadDarkMode, saveDarkMode } from './utils/localStorage'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('none')
  const [darkMode, setDarkMode] = useState(false)

  // Load data on mount
  useEffect(() => {
    setTodos(loadTodos())
    setDarkMode(loadDarkMode())
  }, [])

  // Save todos when they change
  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  // Save dark mode preference
  useEffect(() => {
    saveDarkMode(darkMode)
  }, [darkMode])

  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, updates) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ))
  }

  // Filter todos by search term
  const filteredTodos = todos.filter(todo =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    } else if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    } else if (sortBy === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    return 0
  })

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className={`container ${darkMode ? 'dark' : 'light'}`}>
        <div className="header">
          <h1>Todo Application</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`dark-mode-btn ${darkMode ? 'dark' : 'light'}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <TodoForm onAdd={addTodo} />

        <FilterSort
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          darkMode={darkMode}
        />

        <TodoList
          todos={sortedTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          darkMode={darkMode}
          searchTerm={searchTerm}
        />

        <div className={`stats ${darkMode ? 'dark' : 'light'}`}>
          <strong>Stats:</strong> {todos.length} total tasks | {todos.filter(t => t.completed).length} completed | {todos.filter(t => !t.completed).length} pending
        </div>
      </div>
    </div>
  )
}

export default App
