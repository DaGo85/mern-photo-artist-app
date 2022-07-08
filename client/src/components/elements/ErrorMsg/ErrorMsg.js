// Error message element

function ErrorMsg({ isError }) {
  return (
    <>
      {isError &&
        (isError === "standard" ? (
          <div
            autoFocus
            className="card-setup py-6 my-8 text-center text-2xl text-red-400"
          >
            "Da ist etwas schief gelaufen, versuch es bitte später noch einmal!"
          </div>
        ) : (
          <div
            autoFocus
            className="card-setup py-6 my-8 text-center text-2xl text-red-400"
          >
            {isError}
          </div>
        ))}
    </>
  );
}

export default ErrorMsg;
