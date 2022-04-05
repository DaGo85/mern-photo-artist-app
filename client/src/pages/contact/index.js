import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { useState } from "react";
import { apiroutes, subtexts } from "../../assets/data";

function Contact() {
  const [status, setStatus] = useState("Send");

  // Handler for submitting data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;

    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    let response = await fetch(apiroutes[7].url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });

    setStatus("Sending");
    let result = await response.json();
    alert(result.status);
  };

  return (
    <TransitionWrapper>
      <main className="home-bg bg-setup">
        <PageHeadLine headline={"Contact"} />
        <SubText subtext={subtexts.contact} />
        <form className="flex flex-col min-w-80 items-center justify-center w-full from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
          <input
            className=""
            id="name"
            label="Name"
            defaultValue=""
            placeholder="Please enter your name"
            required
          />
          <input
            className=""
            id="email"
            label="Email"
            defaultValue=""
            placeholder="Please enter your email"
            type="email"
            required
          />
          <textarea
            className=""
            id="message"
            label="Message"
            placeholder="Please enter your message"
            defaultValue=""
            required
          />
          <button>{status}</button>
        </form>
      </main>
    </TransitionWrapper>
  );
}

export default Contact;

/** <!-- component -->
<div class='flex items-center justify-center min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br'>
		<div class='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
			<div class='max-w-md mx-auto space-y-6'>

				<form action="">
					<h2 class="text-2xl font-bold ">Submit your application</h2>
					<p class="my-4 opacity-70">Adipisicing elit. Quibusdam magnam sed ipsam deleniti debitis laboriosam praesentium dolorum doloremque beata.</p>
					<hr class="my-6">
					<label class="uppercase text-sm font-bold opacity-70">Name</label>
					<input type="text" class="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none">
					<label class="uppercase text-sm font-bold opacity-70">Email</label>
					<input type="text" class="p-3 mt-2 mb-4 w-full bg-slate-200 rounded">
					<label class="uppercase text-sm font-bold opacity-70">Language</label>
					<select class="w-full p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none">
						<option value="">Javascript</option>
						<option value="">Ruby</option>
						<option value="">Python</option>
						<option value="">PHP</option>
						<option value="">Java</option>
					</select>
					<div class="my-2 font-medium opacity-70">
						<input type="checkbox">
						Subscribe and follow company updates.
					</div>
					<input type="submit" class="py-3 px-6 my-2 bg-emerald-500 text-white font-medium rounded hover:bg-indigo-500 cursor-pointer ease-in-out duration-300" value="Send">
				</form>

			</div>
		</div>
	</div> */
