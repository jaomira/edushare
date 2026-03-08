import '../styles/Error.css';

const ErrorMessage = ({ mensagem, onDismiss }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <p>{mensagem}</p>
        {onDismiss && (
          <button className="btn-close" onClick={onDismiss}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
