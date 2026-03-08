import '../styles/Loading.css';

const LoadingSpinner = ({ mensagem = 'Carregando...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{mensagem}</p>
    </div>
  );
};

export default LoadingSpinner;
