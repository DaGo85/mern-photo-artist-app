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
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthContext } from "./utility/AuthContextProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./utility/firebase";

// todo: loading spinner?, Carousel?
// button styles,
// error handling: general cant fetch data error
// for readme: on back in browser: stick on same pagination etc.
// bg images optimation, field test image number and proportion for all grids
// button blue : #0070c9 navgrey: #424245 hover?: #06c
// delete mode button

function App() {
  const location = useLocation();
  useScrollToTop();
  const auth = getAuth();
  const { userData, setUserData, setUserCreds } = useAuthContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserCreds(null);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const email = user.email;

        const newUser = { uid, email };

        setUserData(newUser);
      }
    });
  }, [auth]);

  useEffect(() => {
    const fetchUserName = async () => {
      if (userData) {
        try {
          const q = query(
            collection(db, "users"),
            where("uid", "==", userData.uid)
          );
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setUserCreds({ name: data.name });
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      }
    };
    fetchUserName();
  }, [userData]);

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
