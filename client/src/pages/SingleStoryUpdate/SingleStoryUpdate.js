// Update page for a single story

import DeleteModal from "../../components/elements/DeleteModal/DeleteModal";
import ErrorMsg from "../../components/elements/ErrorMsg/ErrorMsg";
import BasicImage from "../../components/elements/BasicImage/BasicImage";
import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";

import { useAuthContext } from "../../utility/AuthContextProvider";
import TransitionWrapper from "../../utility/TransitionWrapper";
import { apiroutes } from "../../assets/data";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import handleDeleteFirebaseImg from "../../utility/handleDeleteFirebaseImg";

function SingleStoryUpdate() {
  const { userCreds } = useAuthContext();
  const fileRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [storyName, setStoryName] = useState();
  const [desc, setDesc] = useState();
  const [story, setStory] = useState();
  const [storyImages, setStoryImages] = useState();
  const [url, setUrl] = useState();
  const [selected, setSelected] = useState();
  const [showModal, setShowModal] = useState(false);

  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("singlestoryupdate")[1];

  // Fetching singlestory from API
  useEffect(() => {
    const getStory = async () => {
      const res = await axios.get(`${apiroutes[6].url}${path}`);
      setStory(res.data);
    };
    getStory();

    const fetchStoryImages = async () => {
      const res = await axios.post(apiroutes[4].url + "storyphotoq", {
        storyPhotoQuery: path,
      });
      setStoryImages(res.data);
    };
    fetchStoryImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handler for deleting singlestory
  const handleDelete = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${userCreds.token}`,
    };

    try {
      await axios.delete(`${apiroutes[6].url}${story._id}`, {
        data: { username: userCreds.name },
        headers: headers,
      });
      navigate("/stories");
    } catch (err) {
      setIsError(
        "Diese Story kann derzeit nicht gelöscht werden, versuche es später noch einmal!"
      );
    }

    handleDeleteFirebaseImg(story.photo, "stories", setIsError);

    storyImages.forEach((storyImage) => {
      handleDeleteFirebaseImg(storyImage.photo, "stories", setIsError);
    });
  };

  //Handler for updating singlestory
  const handleUpdateImage = async (e) => {
    // Restriction for files: jpeg,jpg and png only, also the size has to be
    // maximal 3000000 ( 3mb )
    if (
      e.target.files[0].name.match(/\.(jpeg|jpg|png)$/) &&
      e.target.files[0].size <= 6000000
    ) {
      setSelected(e.target.files[0]);
    } else {
      setIsError("Die Datei ist zu gross!");
      setFile(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${userCreds.token}`,
    };

    if (url) {
      handleDeleteFirebaseImg(story.photo, "stories", setIsError);
    }

    const newStory = {
      username: userCreds.name,
      story: storyName,
      desc: desc,
      photo: url ? url : story.photo,
    };

    //Updating story on MongoDB
    try {
      await axios.put(`${apiroutes[6].url}${story._id}`, newStory, {
        headers: headers,
      });
      navigate("/story" + story._id);
    } catch (err) {
      setIsError("standard");
    }
    setIsError(false);
  };

  // Handler for input
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
    handleUpdateImage(e);
  };

  const deleteHandler = () => setShowModal(true);

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          {story && (
            <>
              <div className="py-4 card-setup md:py-10 max-w-7xl">
                {file ? (
                  <div
                    className="flex flex-col text-center hover:cursor-pointer gap-image"
                    onClick={() => {
                      setFile(null);
                      fileRef.current.value = null;
                    }}
                  >
                    <BasicImage file={file} />
                    <h4>
                      Klick hier, wenn du das vorherige oder ein anderes Bild
                      möchtest!
                    </h4>
                  </div>
                ) : (
                  <div
                    className="flex flex-col text-center hover:cursor-pointer gap-image max-w-7xl"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <BasicImage image={story.photo} alt="Story Bild" />
                    <h4>Klick hier, wenn du das Titel Bild ändern möchtest!</h4>
                  </div>
                )}
                <input
                  accept="image/jpg,image/png,image/jpeg"
                  className="hidden"
                  type="file"
                  onChange={handleInput}
                  multiple={false}
                  ref={fileRef}
                />
              </div>
              <form
                onSubmit={handleUpdate}
                className="card-setup max-w-[800px] w-full py-form gap-form"
              >
                <div className="relative w-full">
                  <input
                    id="storyName"
                    label="StoryName"
                    defaultValue={story.story}
                    type="text"
                    required
                    onChange={(e) => setStoryName(e.target.value)}
                  />
                  <label htmlFor="storyName">
                    Bitte gib einen Story Titel ein
                  </label>
                </div>
                <div className="relative w-full">
                  <textarea
                    id="desc"
                    defaultValue={story.desc}
                    className="pt-2 h-96"
                    required
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <UniversalButton
                  text="Story updaten!"
                  modell="success"
                  type="submit"
                  icon="send"
                />
                {selected && (
                  <ProgressBar
                    selected={selected}
                    setSelected={setSelected}
                    setUrl={setUrl}
                    folder="stories"
                  />
                )}
              </form>
              <ErrorMsg isError={isError} />
              <UniversalButton
                text="Story löschen!"
                handler={deleteHandler}
                modell="delete"
                type="button"
                icon="trash"
              />
              <DeleteModal
                handleDelete={handleDelete}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </>
          )}
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SingleStoryUpdate;
