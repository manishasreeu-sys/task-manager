function TaskSummary({ totalTasks, activeCount, completedCount }) {
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: "▣",
      accent: "primary",
    },
    {
      label: "Active",
      value: activeCount,
      icon: "◎",
      accent: "warning",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: "✓",
      accent: "success",
    },
    {
      label: "Completion",
      value: `${completionRate}%`,
      icon: "↗",
      accent: "info",
    },
  ];

  return (
    <section className="stats-grid" aria-label="Task statistics">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className={`stat-card stat-card--${stat.accent}`}
        >
          <div className="stat-card__top">
            <span className="stat-card__label">{stat.label}</span>
            <span className="stat-card__icon" aria-hidden="true">
              {stat.icon}
            </span>
          </div>
          <p className="stat-card__value">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}

export default TaskSummary;
