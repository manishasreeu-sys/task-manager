import TaskItem from "./TaskItem.jsx";
import EmptyState from "./EmptyState.jsx";

function TaskList({
  tasks,
  filter,
  activeCount,
  hasAnyTasks,
  onToggleComplete,
  onDelete,
  onFocusAddTask,
}) {
  const summaryText =
    activeCount === 1 ? "1 active task" : `${activeCount} active tasks`;

  if (tasks.length === 0) {
    return (
      <section className="task-list-section" aria-label="Task list">
        <div className="task-list-section__header">
          <h2 className="task-list-section__title">Your Tasks</h2>
          {hasAnyTasks && (
            <p className="task-list-section__meta">{summaryText}</p>
          )}
        </div>
        <EmptyState
          filter={filter}
          hasAnyTasks={hasAnyTasks}
          onFocusAddTask={onFocusAddTask}
        />
      </section>
    );
  }

  return (
    <section className="task-list-section" aria-label="Task list">
      <div className="task-list-section__header">
        <h2 className="task-list-section__title">Your Tasks</h2>
        <p className="task-list-section__meta">{summaryText}</p>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
