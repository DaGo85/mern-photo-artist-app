import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { useState } from "react";
import { apiroutes, subtexts } from "../../assets/data";
import axios from "axios";
import ErrorMsg from "../../components/elements/ErrorMsg";

//todo: check functionality after setting up BE
// rework button

function Contact() {
  const [status, setStatus] = useState("Senden");
  const [isError, setIsError] = useState("");

  // Handler for submitting data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Am Senden...");
    const { name, email, message } = e.target.elements;

    const details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    try {
      await axios({
        url: apiroutes[7].url,
        method: "POST",
        data: JSON.stringify(details), // data or body
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      setStatus("Erledigt");
      document.getElementById("form-reset").reset();
    } catch (err) {
      setIsError("standard");
      setStatus("Fehler");
    }
  };

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Contact"} />
          <SubText subtext={subtexts.contact} />
          <form
            id="form-reset"
            onSubmit={handleSubmit}
            className="card-setup md:w-[600px] py-form gap-form"
          >
            <div className="w-full relative">
              <input
                id="name"
                label="Name"
                type="text"
                className="peer"
                autoComplete="name"
                required
                placeholder="Bitte gib deinen Namen ein"
              />
              <label htmlFor="name">Bitte gib deinen Namen ein</label>
            </div>
            <div className="w-full relative">
              <input
                id="email"
                label="Email"
                type="email"
                className="peer"
                autoComplete="email"
                required
                placeholder="Bitte gib deine Email ein"
              />
              <label htmlFor="email">Bitte gib deine Email ein</label>
            </div>
            <div className="w-full relative">
              <textarea
                id="message"
                label="Message"
                className="peer h-96 pt-2 "
                required
                placeholder="Bitte gib deine Nachricht ein"
              />
              <label htmlFor="message">Bitte gib deine Nachricht ein</label>
            </div>
            <button
              disabled={isError}
              type="submit"
              className="button-setup button-success"
            >
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
              </svg>
              {status}
            </button>
          </form>
          {status === "Done" ? (
            <p className="card-setup status-msg text-slate-100">
              Vielen Dank für deine Nachricht!
            </p>
          ) : (
            <ErrorMsg isError={isError} />
          )}
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Contact;
