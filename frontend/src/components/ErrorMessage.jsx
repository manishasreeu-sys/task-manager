function ErrorMessage({ onRetry }) {
  return (
    <section className="error-card" role="alert">
      <div className="error-card__icon" aria-hidden="true">
        !
      </div>
      <h2 className="error-card__title">Unable to load your tasks</h2>
      <p className="error-card__text">
        Please check your connection and try again.
      </p>
      <button type="button" className="btn btn--primary" onClick={onRetry}>
        Try Again
      </button>
    </section>
  );
}

export default ErrorMessage;
