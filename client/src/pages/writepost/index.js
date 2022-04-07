import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { address, apiroutes, subtexts } from "../../assets/data";
import { useState } from "react";
import getImageOrientation from "../../utility/getImageOrientation";
import axios from "axios";
import OrientedImage from "../../components/elements/OrientedImage";

function WritePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);
  const PF = address[0].url;
  console.log(PF);

  const user = "DG";

  //Handler for submitting a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      newPost.orientation = orientation;
      try {
        await axios.post(apiroutes[3].url, data);
      } catch (err) {}
    }

    try {
      const res = await axios.post(apiroutes[2].url, newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  // Handler for getting image orientation
  const inputHandler = async (e) => {
    setFile(e.target.files[0]);
    let imgOrientation = await getImageOrientation(e.target.files[0]);
    setOrientation(imgOrientation);
  };

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Blog Section"} />
          <SubText subtext={subtexts.writepost} />
          <div className="card-setup w-full py-4 md:py-10">
            {
              <OrientedImage
                orientation="1"
                image="164216732395720211002_135452.jpg"
                path={PF}
                alt="test"
              />
            }
          </div>
          <div>
            <button
              disabled="false"
              type="submit"
              className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
            >
              Select File
            </button>
          </div>
          <form className="card-setup py-form gap-form">
            <input
              accept="image/jpg,image/png,image/jpeg"
              className="hidden"
              id="fileInput5"
              type="file"
              onChange={(e) => inputHandler(e)}
            />
            <div className="w-full relative">
              <input
                id="Title"
                label="Title"
                type="text"
                className="peer"
                required
                placeholder="Please enter a title"
              />
              <label htmlFor="Title">Please enter a title</label>
            </div>
            <div className="w-full relative">
              <textarea
                id="Message"
                label="Message"
                className="peer h-96 pt-2"
                required
                placeholder="Please enter your message"
              />
              <label>Please enter your message</label>
            </div>
            <button
              disabled={false}
              type="submit"
              className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
            >
              Publish
            </button>
          </form>
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default WritePost;
