import { useState } from "react";

function TaskItem({ task, onToggleComplete, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDeleteClick() {
    setShowConfirm(true);
  }

  function handleCancelDelete() {
    setShowConfirm(false);
  }

  function handleConfirmDelete() {
    onDelete(task);
    setShowConfirm(false);
  }

  return (
    <li
      className={`task-card ${task.completed ? "task-card--completed" : ""}`}
    >
      <div className="task-card__main">
        <label className="task-card__checkbox-label">
          <input
            type="checkbox"
            className="task-card__checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
            aria-label={`Mark "${task.title}" as ${
              task.completed ? "incomplete" : "complete"
            }`}
          />
          <span className="task-card__checkmark" aria-hidden="true" />
          <span className="task-card__title">{task.title}</span>
        </label>

        {!showConfirm && (
          <button
            type="button"
            className="task-card__menu-btn"
            onClick={handleDeleteClick}
            aria-label={`Delete task: ${task.title}`}
          >
            ⋮
          </button>
        )}
      </div>

      <div className="task-card__footer">
        <span
          className={`task-card__status ${
            task.completed
              ? "task-card__status--completed"
              : "task-card__status--active"
          }`}
        >
          {task.completed ? "Completed" : "Active"}
        </span>
      </div>

      {showConfirm && (
        <div
          className="task-card__confirm"
          role="alertdialog"
          aria-labelledby={`delete-title-${task.id}`}
          aria-describedby={`delete-desc-${task.id}`}
        >
          <p id={`delete-title-${task.id}`} className="task-card__confirm-title">
            Delete task?
          </p>
          <p id={`delete-desc-${task.id}`} className="task-card__confirm-text">
            This action cannot be undone.
          </p>
          <div className="task-card__confirm-actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
