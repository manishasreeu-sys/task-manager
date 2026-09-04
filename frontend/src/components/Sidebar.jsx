const NAV_ITEMS = [
  { id: "all", label: "Dashboard", icon: "◫" },
  { id: "active", label: "Tasks", icon: "◎" },
  { id: "completed", label: "Completed", icon: "✓" },
];

function Sidebar({ activeFilter, onFilterChange }) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">
          ✦
        </span>
        <span className="sidebar__name">Task Manager</span>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`sidebar__nav-item ${
                  activeFilter === item.id ? "sidebar__nav-item--active" : ""
                }`}
                onClick={() => onFilterChange(item.id)}
                aria-current={activeFilter === item.id ? "page" : undefined}
              >
                <span className="sidebar__nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
