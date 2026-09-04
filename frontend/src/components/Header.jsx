function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

function Header() {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__text">
        <h1 className="dashboard-header__title">Dashboard</h1>
        <p className="dashboard-header__subtitle">
          Stay organized and keep moving forward.
        </p>
      </div>
      <div className="dashboard-header__avatar" aria-hidden="true">
        TM
      </div>
    </header>
  );
}

export { getGreeting };
export default Header;
