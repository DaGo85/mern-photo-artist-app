import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { address, apiroutes, subtexts } from "../../assets/data";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

function SinglePostUpdate() {
  const [title, setTitle] = useState("1");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = address[1].url;
  const user = "DG";

  // Fetching singlepost from the API
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiroutes[2].url}${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

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
  const handleUpdate = async () => {
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

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"SinglePost"} />
          <SubText subtext={subtexts.Singlepost} />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SinglePostUpdate;
