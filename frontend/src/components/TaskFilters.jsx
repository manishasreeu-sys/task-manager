const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

function TaskFilters({ filter, onFilterChange }) {
  return (
    <section className="filter-bar" aria-label="Filter tasks">
      <div className="filter-bar__group" role="group" aria-label="Task filter">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`filter-bar__button ${
              filter === item.id ? "filter-bar__button--active" : ""
            }`}
            onClick={() => onFilterChange(item.id)}
            aria-pressed={filter === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default TaskFilters;
