const TODOS_KEY = 'todos'
const DARK_MODE_KEY = 'darkMode'

export const loadTodos = () => {
  try {
    const savedTodos = localStorage.getItem(TODOS_KEY)
    return savedTodos ? JSON.parse(savedTodos) : []
  } catch (error) {
    console.error('Error loading todos:', error)
    return []
  }
}

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving todos:', error)
  }
}

export const loadDarkMode = () => {
  try {
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY)
    return savedDarkMode ? JSON.parse(savedDarkMode) : false
  } catch (error) {
    console.error('Error loading dark mode:', error)
    return false
  }
}

export const saveDarkMode = (darkMode) => {
  try {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode))
  } catch (error) {
    console.error('Error saving dark mode:', error)
  }
}