import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { apiroutes, subtexts } from "../../assets/data";
import { useState } from "react";
import getImageOrientation from "../../utility/getImageOrientation";
import axios from "axios";

function WritePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);

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
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default WritePost;
