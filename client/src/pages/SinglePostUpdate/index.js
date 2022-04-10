import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { address, apiroutes, subtexts } from "../../assets/data";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import OrientedImage from "../../components/elements/OrientedImage";
import getImageOrientation from "../../utility/getImageOrientation";

function SinglePostUpdate() {
  const fileRef = useRef();
  const [post, setPost] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = address[1].url;
  const user = "DG";
  const [title, setTitle] = useState(location.state.title);
  const [desc, setDesc] = useState(location.state.desc);

  console.log("data in update:" + JSON.stringify(location.state));

  // Fetching singlepost from the API
  /*
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiroutes[2].url}${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]); */

  //Handler for deleting singlepost from the API
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiroutes[2].url}${post._id}`, {
        data: { username: user },
      });
      location("/");
    } catch (err) {}
  };

  //Handler for updating singlepost
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { title, desc } = e.target.elements;

    const newPost = {
      username: user,
      title,
      desc,
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
      } catch (err) {}
    }
    //Updating post on MongoDB
    try {
      await axios.put(`${apiroutes[2].url}${post._id}`, newPost);
      setUpdateMode(false);
    } catch (err) {}
  };

  // Handler for getting image orientation
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
    let imgOrientation = await getImageOrientation(e.target.files);
    setOrientation(imgOrientation);
  };
  console.log(title);
  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <div className="card-setup py-4 md:py-10 max-w-7xl">
            {file ? (
              <div
                className="flex flex-col hover:cursor-pointer gap-image text-center"
                onClick={() => {
                  setFile(null);
                  fileRef.current.value = null;
                  fileRef.current.click();
                }}
              >
                <OrientedImage orientation={orientation} file={file} />
                <h4>Do you want an other image? click me!</h4>
              </div>
            ) : (
              <div
                className="flex flex-col hover:cursor-pointer gap-image text-center max-w-7xl"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    className="fill-d"
                    d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"
                  />
                </svg>
                <h4>Click me for adding an image!</h4>
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
                defaultValue={location.state.title}
                type="text"
                required
              />
            </div>
            <div className="w-full relative">
              <textarea
                id="message"
                defaultValue={location.state.desc}
                className="h-96 pt-2"
                required
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
            >
              Update Post!
            </button>
          </form>
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SinglePostUpdate;
