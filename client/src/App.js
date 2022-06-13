// Router component

// Import for pages and components
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";
import Home from "./pages/Home/Home";
import Impressum from "./pages/Impressum/Impressum";
import Stories from "./pages/Stories/Stories";
import WritePost from "./pages/WritePost/WritePost";
import WriteStory from "./pages/WriteStory/WriteStory";
import Write from "./pages/Write/Write";
import SinglePost from "./pages/SinglePost/SinglePost";
import SingleStory from "./pages/SingleStory/SingleStory";
import SinglePostUpdate from "./pages/SinglePostUpdate/SinglePostUpdate";
import SingleStoryUpdate from "./pages/SingleStoryUpdate/SingleStoryUpdate";
import Login from "./pages/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import ImageModal from "./components/ImageModal/ImageModal";

// Import for utilities and context
import { AnimatePresence } from "framer-motion";
import useScrollToTop from "./utility/ScrollToTop";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthContext } from "./utility/AuthContextProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./utility/firebase";

// Import for React and dependencies
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

// todo: loading spinner?
// button styles,
// error handling: general cant fetch data error
// for readme: on back in browser: stick on same pagination etc.
// field test image number and proportion for all grids
// delete mode button, homecards
// todo: fix mongodb security after heroku kk setup

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
        user.getIdToken(true).then((token) => {
          setUserCreds((prevState) => {
            return { ...prevState, token };
          });
        });

        const uid = user.uid;
        const email = user.email;

        const newUser = { uid, email };

        setUserData(newUser);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          setUserCreds((prevState) => {
            return { ...prevState, name: data.name };
          });
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      }
    };
    fetchUserName();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Route path="/post:postId" element={<SinglePost />} />
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
