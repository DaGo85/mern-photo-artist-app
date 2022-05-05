// Update page for a single post

import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";
import BasicImage from "../../components/elements/BasicImage/BasicImage";
import DeleteModal from "../../components/elements/DeleteModal/DeleteModal";
import ErrorMsg from "../../components/elements/ErrorMsg/ErrorMsg";

import TransitionWrapper from "../../utility/TransitionWrapper";
import { address, apiroutes } from "../../assets/data";
import { useAuthContext } from "../../utility/AuthContextProvider";
import getImageOrientation from "../../utility/getImageOrientation";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

function SinglePostUpdate() {
  const fileRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);
  const [post, setPost] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  const { userCreds } = useAuthContext();

  const location = useLocation();
  const path = location.pathname.split("singlepostupdate")[1];
  const PF = address[1].url;

  // Fetching singlepost from API
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiroutes[2].url}${path}`);
      setPost(res.data);
    };
    getPost();
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
  };

  //Handler for updating singlepost
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { title, desc } = e.target.elements;

    const newPost = {
      username: userCreds.name,
      title: title.value,
      desc: desc.value,
      photo: post.photo,
    };

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${userCreds.token}`,
    };

    if (file) {
      if (file.name.match(/\.(jpeg|jpg|png)$/) && file.size <= 3000000) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        newPost.orientation = orientation;
        //Uploading file to server
        try {
          await axios.post(apiroutes[3].url, data, {
            headers: headers,
          });
        } catch (err) {
          setIsError("standard");
        }
      } else {
        setIsError("Die Datei ist zu gross!");
      }
    }
    //Updating post on MongoDB
    try {
      await axios.put(`${apiroutes[2].url}${post._id}`, newPost, {
        headers: headers,
      });
      navigate("/post" + post._id);
    } catch (err) {
      setIsError("standard");
    }
  };

  // Handler for getting image orientation
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
    let imgOrientation = await getImageOrientation(e.target.files);
    setOrientation(imgOrientation);
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
                    <BasicImage
                      image={post.photo}
                      alt="Blog Post Bild"
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
                    id="title"
                    label="Title"
                    defaultValue={post.title}
                    type="text"
                    required
                  />
                  <label htmlFor="title">Bitte gib einen Titel ein</label>
                </div>
                <div className="w-full relative">
                  <textarea
                    id="desc"
                    defaultValue={post.desc}
                    className="h-96 pt-2"
                    required
                  />
                  <label htmlFor="desc">Bitte gib eine Nachricht ein</label>
                </div>
                <UniversalButton
                  text="Update Post!"
                  modell="success"
                  type="submit"
                  icon="send"
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
