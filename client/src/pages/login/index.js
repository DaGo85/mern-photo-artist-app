import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";
import { logInWithEmailAndPassword } from "../../utility/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    logInWithEmailAndPassword(email, password);
    navigate("/");
  };
  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Login"} />
          <SubText subtext={subtexts.login} />
          <form
            id="form-reset"
            onSubmit={handleLogin}
            className="card-setup md:w-[600px] py-form gap-form"
          >
            <div className="w-full relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
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
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                label="password"
                type="text"
                className="peer"
                autoComplete="password"
                required
                placeholder="Please enter your password"
              />
              <label htmlFor="password">Please enter your password</label>
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-d text-light font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Login;
