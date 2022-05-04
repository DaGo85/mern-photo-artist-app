// Update page for a single story

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { address, apiroutes } from "../../assets/data";
import DeleteModal from "../../components/elements/DeleteModal";
import ErrorMsg from "../../components/elements/ErrorMsg";
import OrientedImage from "../../components/elements/OrientedImage";
import UniversalButton from "../../components/elements/UniversalButton";
import { useAuthContext } from "../../utility/AuthContextProvider";
import TransitionWrapper from "../../utility/TransitionWrapper";

function SingleStoryUpdate() {
  const { userCreds } = useAuthContext();
  const fileRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [story, setStory] = useState();
  const [showModal, setShowModal] = useState(false);

  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("singlestoryupdate")[1];
  const PF = address[2].url;

  // Fetching singlepost from API
  useEffect(() => {
    const getStory = async () => {
      const res = await axios.get(`${apiroutes[6].url}${path}`);
      setStory(res.data);
    };
    getStory();
  }, []);

  //Handler for deleting singlepost from the API
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiroutes[6].url}${story._id}`, {
        data: { username: userCreds.name },
      });
      navigate("/stories");
    } catch (err) {
      setIsError(
        "Diese Story kann derzeit nicht gelöscht werden, versuche es später noch einmal!"
      );
    }
  };

  //Handler for updating singlepost
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { storyName, desc } = e.target.elements;

    const newStory = {
      username: userCreds.name,
      story: storyName.value,
      desc: desc.value,
      photo: story.photo,
    };

    if (file) {
      if (file.name.match(/\.(jpeg|jpg|png)$/) && file.size <= 3000000) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newStory.photo = filename;

        //Uploading file to server
        try {
          await axios.post(apiroutes[5].url, data);
        } catch (err) {
          setIsError("standard");
        }
      } else {
        setIsError("Die Datei ist zu gross!");
      }
    }
    //Updating post on MongoDB
    try {
      await axios.put(`${apiroutes[6].url}${story._id}`, newStory);
      navigate("/story" + story._id);
    } catch (err) {
      setIsError("standard");
    }
  };

  // Handler for input
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
  };

  const deleteHandler = () => setShowModal(true);

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          {story && (
            <>
              <div className="card-setup py-4 md:py-10 max-w-7xl">
                {file ? (
                  <div
                    className="flex flex-col hover:cursor-pointer gap-image text-center"
                    onClick={() => {
                      setFile(null);
                      fileRef.current.value = null;
                    }}
                  >
                    <OrientedImage file={file} />
                    <h4>
                      Klick hier, wenn du das vorherige oder ein anderes Bild
                      möchtest!
                    </h4>
                  </div>
                ) : (
                  <div
                    className="flex flex-col hover:cursor-pointer gap-image text-center max-w-7xl"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <OrientedImage
                      image={story.photo}
                      alt="Story Bild"
                      path={PF}
                    />
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
                <div className="w-full relative">
                  <input
                    id="storyName"
                    label="StoryName"
                    defaultValue={story.story}
                    type="text"
                    required
                  />
                  <label htmlFor="storyName">
                    Bitte gib einen Story Titel ein
                  </label>
                </div>
                <div className="w-full relative">
                  <textarea
                    id="desc"
                    defaultValue={story.desc}
                    className="h-96 pt-2"
                    required
                  />
                </div>
                <UniversalButton
                  text="Story updaten!"
                  modell="success"
                  type="submit"
                  icon="send"
                />
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
                deleteType="post"
              />
            </>
          )}
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SingleStoryUpdate;
