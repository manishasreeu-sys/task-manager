import { useState, useEffect, useRef } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api.js";
import Header, { getGreeting } from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskSummary from "./components/TaskSummary.jsx";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskList from "./components/TaskList.jsx";
import LoadingState from "./components/LoadingState.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const taskInputRef = useRef(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("load");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTask(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    try {
      const newTask = await createTask(trimmedTitle);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle("");
    } catch (err) {
      console.error(err);
      setError("action");
    }
  }

  async function handleToggleComplete(task) {
    try {
      const updatedTask = await updateTask(task.id, {
        completed: !task.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === task.id ? updatedTask : item))
      );
    } catch (err) {
      console.error(err);
      setError("action");
    }
  }

  async function handleDeleteTask(task) {
    try {
      await deleteTask(task.id);
      setTasks((prevTasks) => prevTasks.filter((item) => item.id !== task.id));
    } catch (err) {
      console.error(err);
      setError("action");
    }
  }

  function handleFocusAddTask() {
    taskInputRef.current?.focus();
    taskInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = totalTasks - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const greeting = getGreeting();

  return (
    <div className="app-layout">
      <Sidebar activeFilter={filter} onFilterChange={setFilter} />

      <div className="app-shell">
        <Header />

        <nav className="mobile-nav" aria-label="Mobile navigation">
          <button
            type="button"
            className={`mobile-nav__item ${
              filter === "all" ? "mobile-nav__item--active" : ""
            }`}
            onClick={() => setFilter("all")}
            aria-current={filter === "all" ? "page" : undefined}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`mobile-nav__item ${
              filter === "active" ? "mobile-nav__item--active" : ""
            }`}
            onClick={() => setFilter("active")}
            aria-current={filter === "active" ? "page" : undefined}
          >
            Tasks
          </button>
          <button
            type="button"
            className={`mobile-nav__item ${
              filter === "completed" ? "mobile-nav__item--active" : ""
            }`}
            onClick={() => setFilter("completed")}
            aria-current={filter === "completed" ? "page" : undefined}
          >
            Completed
          </button>
        </nav>

        <main className="dashboard">
          <section className="welcome-section" aria-label="Welcome">
            <h2 className="welcome-section__greeting">{greeting}</h2>
            <p className="welcome-section__headline">Let&apos;s get things done.</p>
            <p className="welcome-section__description">
              Manage your tasks, track your progress, and stay focused.
            </p>
          </section>

          {error === "load" ? (
            <ErrorMessage onRetry={loadTasks} />
          ) : loading ? (
            <LoadingState />
          ) : (
            <>
              <TaskSummary
                totalTasks={totalTasks}
                activeCount={activeCount}
                completedCount={completedCount}
              />

              <TaskForm
                title={title}
                onTitleChange={setTitle}
                onSubmit={handleAddTask}
                inputRef={taskInputRef}
              />

              {error === "action" && (
                <div className="inline-error" role="alert">
                  <p>Something went wrong. Please try again.</p>
                </div>
              )}

              <TaskFilters filter={filter} onFilterChange={setFilter} />

              <TaskList
                tasks={filteredTasks}
                filter={filter}
                activeCount={activeCount}
                hasAnyTasks={totalTasks > 0}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onFocusAddTask={handleFocusAddTask}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
