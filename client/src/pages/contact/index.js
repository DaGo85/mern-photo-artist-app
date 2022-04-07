import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { useState } from "react";
import { apiroutes, subtexts } from "../../assets/data";
import axios from "axios";

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
      console.error(err);
      setIsError(true);
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
              <label>Please enter your message</label>
            </div>
            <button
              disabled={isError}
              type="submit"
              className="py-3 px-6 bg-d text-light font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
            >
              {status}
            </button>
          </form>
          {status === "Done" ? (
            <p className="card-setup status-msg text-light">
              Thank you for your Message!
            </p>
          ) : (
            isError && (
              <p className="card-setup status-msg text-err">
                Something went wrong. Please try again later!
              </p>
            )
          )}
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Contact;
