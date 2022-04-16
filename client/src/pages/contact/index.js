import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { useState } from "react";
import { apiroutes, subtexts } from "../../assets/data";
import axios from "axios";
import ErrorMsg from "../../components/elements/ErrorMsg";

//todo: check functionality after setting up BE

function Contact() {
  const [status, setStatus] = useState("Send");
  const [isError, setIsError] = useState("");

  // Handler for submitting data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
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
      setStatus("Done");
      document.getElementById("form-reset").reset();
    } catch (err) {
      setIsError("standard");
      setStatus("Error");
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
                placeholder="Please enter your name"
              />
              <label htmlFor="name">Please enter your name</label>
            </div>
            <div className="w-full relative">
              <input
                id="email"
                label="Email"
                type="email"
                className="peer"
                autoComplete="email"
                required
                placeholder="Please enter your email"
              />
              <label htmlFor="email">Please enter your email</label>
            </div>
            <div className="w-full relative">
              <textarea
                id="message"
                label="Message"
                className="peer h-96 pt-2 "
                required
                placeholder="Please enter your message"
              />
              <label htmlFor="message">Please enter your message</label>
            </div>
            <button
              disabled={isError}
              type="submit"
              className="button-setup button-success"
            >
              {status}
            </button>
          </form>
          {status === "Done" ? (
            <p className="card-setup status-msg text-slate-100">
              Thank you for your Message!
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
