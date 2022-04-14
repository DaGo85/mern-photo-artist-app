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
import SingleStoryUpdate from "./pages/SingleStoryUpdate";
import ImageModal from "./components/ImageModal";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAuthContext } from "./utility/AuthContextProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// todo: user, context, loading spinner?, IntersectionObserver?
// button styles, pop in animation change, helpertext for using page features
// error handling: general cant fetch data error
// for readme: on back in browser: stick on same pagination etc.
// bg images optimation, field test image number and proportion for all grids

function App() {
  const location = useLocation();
  useScrollToTop();
  const auth = getAuth();
  const { userData, setUserData } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const email = user.email;

        const newUser = { email };

        setUserData(newUser);
      }
    });
  }, [auth]);

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
          <Route path="/login" element={<Login />} />
          <Route path="/:postId" element={<SinglePost />} />
          <Route path={`/story:storyId`} element={<SingleStory />} />
          {userData && <Route path="/write" element={<Write />} />}
          {userData && <Route path="/writepost" element={<WritePost />} />}
          {userData && <Route path="/writestory" element={<WriteStory />} />}
          {userData && (
            <Route
              path="/singlepostupdate:postId"
              element={<SinglePostUpdate />}
            />
          )}
          {userData && (
            <Route
              path="/singlestoryupdate:storyId"
              element={<SingleStoryUpdate />}
            />
          )}
        </Routes>
        <ImageModal />
      </AnimatePresence>
    </>
  );
}

export default App;
