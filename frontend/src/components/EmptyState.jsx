function EmptyState({ filter, hasAnyTasks, onFocusAddTask }) {
  if (filter === "completed" && hasAnyTasks) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          ✓
        </div>
        <h3 className="empty-state__title">No completed tasks</h3>
        <p className="empty-state__text">
          Complete a task and it will appear here.
        </p>
      </div>
    );
  }

  if (filter === "active" && hasAnyTasks) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          ◎
        </div>
        <h3 className="empty-state__title">No active tasks</h3>
        <p className="empty-state__text">
          You&apos;re all caught up. Great work!
        </p>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        ✦
      </div>
      <h3 className="empty-state__title">No tasks yet</h3>
      <p className="empty-state__text">
        You&apos;re all caught up. Add a task above to get started.
      </p>
      <button
        type="button"
        className="btn btn--primary empty-state__button"
        onClick={onFocusAddTask}
      >
        Add your first task
      </button>
    </div>
  );
}

export default EmptyState;
