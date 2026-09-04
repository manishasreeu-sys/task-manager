function TaskForm({ title, onTitleChange, onSubmit, inputRef }) {
  return (
    <section className="card add-task-card" aria-labelledby="add-task-heading">
      <h2 id="add-task-heading" className="card__title">
        Add a new task
      </h2>

      <form className="add-task-form" onSubmit={onSubmit}>
        <label htmlFor="task-title" className="visually-hidden">
          Task title
        </label>
        <input
          ref={inputRef}
          id="task-title"
          type="text"
          className="add-task-form__input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn btn--primary add-task-form__button">
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
