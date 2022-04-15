import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";
import { logInWithEmailAndPassword, logout } from "../../utility/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../utility/AuthContextProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { userData, setUserData } = useAuthContext();

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
          <div className="card-setup md:w-[600px] py-form gap-form">
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
                type="password"
                className="peer"
                autoComplete="password"
                required
                placeholder="Please enter your password"
              />
              <label htmlFor="password">Please enter your password</label>
            </div>
            <button
              onClick={() => handleLogin()}
              className="py-3 px-6 bg-gradient-to-r from-ssuccess to-b text-light font-medium rounded hover:to-shover hover:text-d cursor-pointer ease-in-out duration-300"
            >
              Login
            </button>
            {userData && (
              <button
                onClick={() => {
                  logout();
                  setUserData(null);
                  navigate("/");
                }}
                className="py-3 px-6 bg-gradient-to-r from-serror to-red-900 text-light font-medium rounded hover:to-shover hover:text-d cursor-pointer ease-in-out duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Login;
