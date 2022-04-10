import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Impressum from "./pages/Impressum";
import Stories from "./pages/Stories";
import WritePost from "./pages/WritePost";
import WriteStory from "./pages/WriteStory";
import Write from "./pages/Write";
import SinglePost from "./pages/SinglePost";
import SingleStory from "./pages/SingleStory";
import SinglePostUpdate from "./pages/SinglePostUpdate";
import useScrollToTop from "./utility/ScrollToTop";

// todo:  stories, modal, user, griddesign, BE refactor?, randomimage, context/redux-toolkit,
//         pop in animation change, home screen bug @md

function App() {
  const userData = "DG";
  const location = useLocation();
  useScrollToTop();

  return (
    <>
      <NavBar />
      <AnimatePresence initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/:postId" element={<SinglePost />} />
          <Route path={`/story:storyId`} element={<SingleStory />} />
          {userData && <Route path="/write" element={<Write />} />}
          {userData && <Route path="/writepost" element={<WritePost />} />}
          {userData && <Route path="/writestory" element={<WriteStory />} />}
          {userData && (
            <Route path="/singlepostupdate" element={<SinglePostUpdate />} />
          )}
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
