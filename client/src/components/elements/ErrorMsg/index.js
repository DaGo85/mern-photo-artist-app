import React from "react";

function ErrorMsg({ isError }) {
  return (
    <>
      {isError &&
        (isError === "standard" ? (
          <div autoFocus className="card-setup status-msg text-err">
            "Something went wrong, please try again later!"
          </div>
        ) : (
          <div autoFocus className="card-setup status-msg text-err">
            {isError}
          </div>
        ))}
    </>
  );
}

export default ErrorMsg;
