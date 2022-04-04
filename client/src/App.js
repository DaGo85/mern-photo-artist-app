import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Contact from "./pages/contact";
import Gallery from "./pages/gallery";
import Home from "./pages/home";
import Impressum from "./pages/impressum";
import Stories from "./pages/stories";
import WritePost from "./pages/writepost";
import WriteStory from "./pages/writestory";

function App() {
  const userData = "DG";
  return (
    <NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        {/*{!userData && <Route path="/" element={<Login />} />}
      {!userData && <Route path="/register" element={<Register />} />}
      {!userData && <Route path="/reset" element={<Reset />} />}
      {!userData && <Route path="*" element={<Login />} />}*/}
        {userData && <Route path="/writepost" element={<WritePost />} />}
        {userData && <Route path="/writestory" element={<WriteStory />} />}
      </Routes>
    </NavBar>
  );
}

export default App;
