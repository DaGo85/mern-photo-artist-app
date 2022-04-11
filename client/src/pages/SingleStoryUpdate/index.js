import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { address, apiroutes } from "../../assets/data";
import DeleteModal from "../../components/elements/DeleteModal";
import ErrorMsg from "../../components/elements/ErrorMsg";
import OrientedImage from "../../components/elements/OrientedImage";
import getImageOrientation from "../../utility/getImageOrientation";
import TransitionWrapper from "../../utility/TransitionWrapper";

function SingleStoryUpdate() {
  const fileRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);
  const [story, setStory] = useState();
  const [showModal, setShowModal] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("singlestoryupdate")[1];
  const PF = address[2].url;
  const user = "DG";

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
        data: { username: user },
      });
      navigate("/stories");
    } catch (err) {
      setErrorMsg("Can't delete this story.Please try again later!");
      setIsError(true);
    }
  };

  //Handler for updating singlepost
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { storyName, desc } = e.target.elements;

    const newStory = {
      username: user,
      story: storyName.value,
      desc: desc.value,
      photo: story.photo,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newStory.photo = filename;
      newStory.orientation = orientation;
      //Uploading file to server
      try {
        await axios.post(apiroutes[5].url, data);
      } catch (err) {
        setErrorMsg("");
        setIsError(true);
      }
    } else {
      setErrorMsg("The file size is too big!");
      setIsError(true);
    }
    //Updating post on MongoDB
    try {
      await axios.put(`${apiroutes[6].url}${story._id}`, newStory);
      navigate("/story" + story._id);
    } catch (err) {
      setErrorMsg("");
      setIsError(true);
    }
  };

  // Handler for getting image orientation
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
    let imgOrientation = await getImageOrientation(e.target.files);
    setOrientation(imgOrientation);
  };

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
                    <OrientedImage orientation={orientation} file={file} />
                    <h4>
                      Do you want your previous image or an other one? Click me!
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
                      orientation={story.orientation}
                      image={story.photo}
                      alt="story photo"
                      path={PF}
                    />
                    <h4>Click me for changing title image!</h4>
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
                  <label htmlFor="storyName">Please enter a story title</label>
                </div>
                <div className="w-full relative">
                  <textarea
                    id="desc"
                    defaultValue={story.desc}
                    className="h-96 pt-2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
                >
                  Update Story!
                </button>
              </form>
              <ErrorMsg
                isError={isError}
                message={
                  errorMsg
                    ? errorMsg
                    : "Something went wrong, please try again later!"
                }
              />
              <button
                onClick={() => setShowModal(true)}
                className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
              >
                Delete Story!
              </button>
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
