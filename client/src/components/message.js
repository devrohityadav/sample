import React from "react";

const Message = ({ type, message }) => {
  if (type === "success")
    return (
      <div className="success-message">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="#4caf50"
          />
        </svg>
        {message}
      </div>
    );

  if (type === "error")
    return (
      <div className="error-message">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
            fill="#e0001c"
          />
        </svg>
        {message}
      </div>
    );
  return <div className="error-message">{message}</div>;
};

export { Message };
