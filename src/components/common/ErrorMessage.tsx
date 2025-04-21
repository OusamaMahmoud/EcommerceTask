interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
  }
  
  const ErrorMessage = ({ message = "Something went wrong.", onRetry }: ErrorMessageProps) => {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center dark:bg-red-200 dark:text-red-800">
        <p>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  };
  
  export default ErrorMessage;
  