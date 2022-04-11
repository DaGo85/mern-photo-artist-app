import TransitionWrapper from "../../utility/TransitionWrapper";
import { address, apiroutes } from "../../assets/data";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import OrientedImage from "../../components/elements/OrientedImage";
import getImageOrientation from "../../utility/getImageOrientation";
import DeleteModal from "../../components/elements/DeleteModal";
import ErrorMsg from "../../components/elements/ErrorMsg";

function SinglePostUpdate() {
  const fileRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);
  const [post, setPost] = useState();
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("singlepostupdate")[1];
  const PF = address[1].url;
  const user = "da";

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
    try {
      await axios.delete(`${apiroutes[2].url}${post._id}`, {
        data: { username: user },
      });
      navigate("/");
    } catch (err) {
      setErrorMsg("Can't delete this post.Please try again later!");
      setIsError(true);
    }
  };

  //Handler for updating singlepost
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { title, desc } = e.target.elements;

    const newPost = {
      username: user,
      title: title.value,
      desc: desc.value,
      photo: post.photo,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      newPost.orientation = orientation;
      //Uploading file to server
      try {
        await axios.post(apiroutes[3].url, data);
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
      await axios.put(`${apiroutes[2].url}${post._id}`, newPost);
      navigate("/" + post._id);
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
                    <OrientedImage orientation={orientation} file={file} />
                    <h4>
                      Do you want your previous image or another one? Click me!
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
                    <OrientedImage
                      orientation={post.orientation}
                      image={post.photo}
                      alt="post photo"
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
                    id="title"
                    label="Title"
                    defaultValue={post.title}
                    type="text"
                    required
                  />
                  <label htmlFor="title">Please enter a title</label>
                </div>
                <div className="w-full relative">
                  <textarea
                    id="desc"
                    defaultValue={post.desc}
                    className="h-96 pt-2"
                    required
                  />
                  <label htmlFor="desc">Please enter a Message</label>
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
                >
                  Update Post!
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
                Delete Post!
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

export default SinglePostUpdate;
