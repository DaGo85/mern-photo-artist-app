import React from "react";

function ErrorMsg({ isError }) {
  return (
    <>
      {isError &&
        (isError === "standard" ? (
          <div autoFocus className="card-setup status-msg text-err">
            "Da ist etwas schief gelaufen, versuch es bitte später noch einmal!"
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
