function LoadingState() {
  return (
    <section className="loading-state" aria-live="polite" aria-busy="true">
      <p className="loading-state__text">Loading your tasks...</p>
      <div className="loading-state__skeletons" aria-hidden="true">
        <div className="skeleton skeleton--stat" />
        <div className="skeleton skeleton--stat" />
        <div className="skeleton skeleton--stat" />
        <div className="skeleton skeleton--stat" />
        <div className="skeleton skeleton--card" />
        <div className="skeleton skeleton--task" />
        <div className="skeleton skeleton--task" />
        <div className="skeleton skeleton--task" />
      </div>
    </section>
  );
}

export default LoadingState;
