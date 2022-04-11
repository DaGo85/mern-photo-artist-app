import React from "react";

function ErrorMsg({ isError, message }) {
  return (
    <>
      {isError && (
        <div autoFocus className="card-setup status-msg text-err">
          {message}
        </div>
      )}
    </>
  );
}

export default ErrorMsg;
