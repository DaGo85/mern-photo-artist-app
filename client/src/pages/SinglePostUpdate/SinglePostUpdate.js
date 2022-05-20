// Update page for a single post

import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";
import BasicImage from "../../components/elements/BasicImage/BasicImage";
import DeleteModal from "../../components/elements/DeleteModal/DeleteModal";
import ErrorMsg from "../../components/elements/ErrorMsg/ErrorMsg";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";

import TransitionWrapper from "../../utility/TransitionWrapper";
import { apiroutes } from "../../assets/data";
import { useAuthContext } from "../../utility/AuthContextProvider";
import getImageOrientation from "../../utility/getImageOrientation";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import handleDeleteFirebaseImg from "../../utility/handleDeleteFirebaseImg";

function SinglePostUpdate() {
  const fileRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [url, setUrl] = useState();
  const [selected, setSelected] = useState();
  const [post, setPost] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  const { userCreds } = useAuthContext();

  const location = useLocation();
  const path = location.pathname.split("singlepostupdate")[1];

  // Fetching singlepost from API
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiroutes[2].url}${path}`);
      setPost(res.data);
    };
    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handler for deleting singlepost from the API
  const handleDelete = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${userCreds.token}`,
    };

    try {
      await axios.delete(`${apiroutes[2].url}${post._id}`, {
        data: { username: userCreds.name },
        headers: headers,
      });
      navigate("/");
    } catch (err) {
      setIsError(
        "Dieses Foto kann derzeit nicht gelöscht werden, versuche es später noch einmal!"
      );
    }
    handleDeleteFirebaseImg(post.photo, "posts", setIsError);
  };

  //Handler for updating singlepost
  const handleUpdateImage = async (e) => {
    // Restriction for files: jpeg,jpg and png only, also the size has to be
    // maximal 3000000 ( 3mb )
    if (
      e.target.files[0].name.match(/\.(jpeg|jpg|png)$/) &&
      e.target.files[0].size <= 3000000
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
      handleDeleteFirebaseImg(post.photo, "posts", setIsError);
    }

    const newPost = {
      username: userCreds.name,
      title: title,
      desc: desc,
      photo: url ? url : post.photo,
      orientation: orientation,
    };

    //Updating post on MongoDB
    try {
      await axios.put(`${apiroutes[2].url}${post._id}`, newPost, {
        headers: headers,
      });
      navigate("/post" + post._id);
    } catch (err) {
      setIsError("standard");
    }
    setIsError(false);
  };

  // Handler for getting image orientation
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
    let imgOrientation = await getImageOrientation(e.target.files);
    setOrientation(imgOrientation);
    handleUpdateImage(e);
  };

  const deleteHandler = () => setShowModal(true);

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          {post && (
            <>
              <div className="card-setup py-4 md:py-10 max-w-7xl">
                {file ? (
                  <div
                    className="flex flex-col hover:cursor-pointer gap-image text-center"
                    onClick={() => {
                      setFile(null);
                      fileRef.current.value = null;
                      handleDeleteFirebaseImg(url, "posts");
                    }}
                  >
                    <BasicImage file={file} />
                    <h4>
                      Klick hier, wenn du ein anderes Bild wählen möchtest!
                    </h4>
                  </div>
                ) : (
                  <div
                    className="flex flex-col hover:cursor-pointer gap-image text-center max-w-7xl"
                    onClick={() => {
                      fileRef.current.click();
                      setIsError(false);
                    }}
                  >
                    <BasicImage image={post.photo} alt="Blog Post Bild" />
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
                {selected && (
                  <ProgressBar
                    selected={selected}
                    setSelected={setSelected}
                    setUrl={setUrl}
                    folder="posts"
                  />
                )}
              </div>
              <form
                onSubmit={handleUpdate}
                className="card-setup max-w-[800px] w-full py-form gap-form"
              >
                <div className="w-full relative">
                  <input
                    id="title"
                    label="Title"
                    defaultValue={post.title}
                    type="text"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="title">Bitte gib einen Titel ein</label>
                </div>
                <div className="w-full relative">
                  <textarea
                    id="desc"
                    defaultValue={post.desc}
                    className="h-96 pt-2"
                    required
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label htmlFor="desc">Bitte gib eine Nachricht ein</label>
                </div>
                <UniversalButton
                  text="Update Post!"
                  modell="success"
                  type="submit"
                  icon="send"
                  disabled={selected}
                />
              </form>
              <ErrorMsg isError={isError} />
              <UniversalButton
                text="Post löschen!"
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

export default SinglePostUpdate;
