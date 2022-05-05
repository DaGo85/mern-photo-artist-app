// Login page

import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";
import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import SubText from "../../components/elements/SubText/SubText";

import { subtexts } from "../../assets/data";
import { logInWithEmailAndPassword, logout } from "../../utility/firebase";
import TransitionWrapper from "../../utility/TransitionWrapper";
import { useAuthContext } from "../../utility/AuthContextProvider";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// todo

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { userData, setUserData } = useAuthContext();

  const handleLogin = () => {
    logInWithEmailAndPassword(email, password);
    navigate("/");
  };

  const logoutHandler = () => {
    logout();
    setUserData(null);
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
                placeholder="Bitte gib deine Email ein"
              />
              <label htmlFor="email">Bitte gib deine Email ein</label>
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
                placeholder="Bitte gib dein Passwort ein"
              />
              <label htmlFor="password">Bitte gib dein Passwort ein</label>
            </div>
            <UniversalButton
              text="Login"
              handler={handleLogin}
              modell="success"
              type="button"
            />
            {userData && (
              <UniversalButton
                text="Logout"
                handler={logoutHandler}
                modell="delete"
                type="button"
              />
            )}
          </div>
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Login;
