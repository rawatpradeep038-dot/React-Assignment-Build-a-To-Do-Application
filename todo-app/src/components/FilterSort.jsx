import '../styles/FilterSort.css'

function FilterSort({ searchTerm, onSearchChange, sortBy, onSortChange, darkMode }) {
  return (
    <div className="filter-sort">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className={`search-input ${darkMode ? 'dark' : 'light'}`}
      />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className={`sort-select ${darkMode ? 'dark' : 'light'}`}
      >
        <option value="none">Sort by...</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
        <option value="createdAt">Created Date</option>
      </select>
    </div>
  )
}

export default FilterSort