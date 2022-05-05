// WritePost page

import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { apiroutes, subtexts } from "../../assets/data";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import getImageOrientation from "../../utility/getImageOrientation";
import axios from "axios";
import BasicImage from "../../components/elements/BasicImage";
import ErrorMsg from "../../components/elements/ErrorMsg";
import { useAuthContext } from "../../utility/AuthContextProvider";
import UniversalButton from "../../components/elements/UniversalButton";

function WritePost() {
  const { userCreds } = useAuthContext();
  const [file, setFile] = useState(null);
  const [orientation, setOrientation] = useState(1);
  const fileRef = useRef();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  //Handler for submitting a new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, message } = e.target.elements;

    const newPost = {
      username: userCreds.name,
      title: title.value,
      desc: message.value,
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
        try {
          await axios.post(apiroutes[3].url, data, {
            headers: headers,
          });
        } catch (err) {
          setIsError("standard");
        }
        try {
          const res = await axios.post(apiroutes[2].url, newPost, {
            headers: headers,
          });
          navigate("/post" + res.data._id);
        } catch (err) {
          setIsError("standard");
        }
        setIsError(false);
      } else {
        setIsError("Die Datei ist zu gross!");
        setIsError(true);
      }
    }
    if (!file) {
      setIsError("Du hast kein Bild ausgesucht!");
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
          <PageHeadLine headline={"Blog-Eintrag"} />
          <SubText subtext={subtexts.writepost} />
          <div className="card-setup py-4 md:py-10 max-w-7xl">
            {file ? (
              <div
                className="flex flex-col hover:cursor-pointer gap-image text-center"
                onClick={() => {
                  setFile(null);
                  fileRef.current.value = null;
                  setIsError(false);
                  fileRef.current.click();
                }}
              >
                <BasicImage file={file} />
                <h4>Klick hier, wenn du ein anderes Bild wählen möchtest!</h4>
              </div>
            ) : (
              <div
                className="flex flex-col hover:cursor-pointer gap-image text-center max-w-7xl"
                onClick={() => {
                  setIsError(false);
                  fileRef.current.click();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    className="fill-basic"
                    d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"
                  />
                </svg>
                <h4>Klick hier, wenn du ein Bild hinzufügen willst!</h4>
              </div>
            )}
          </div>
          <input
            accept="image/jpg,image/png,image/jpeg"
            className="hidden"
            type="file"
            onChange={handleInput}
            multiple={false}
            ref={fileRef}
          />
          <form
            onSubmit={handleSubmit}
            className="card-setup max-w-[800px] w-full py-form gap-form"
          >
            <div className="w-full relative">
              <input
                id="title"
                label="Title"
                type="text"
                className="peer"
                required
                placeholder="Bitte gib einen Titel ein"
              />
              <label htmlFor="title">Bitte gib einen Titel ein</label>
            </div>
            <div className="w-full relative">
              <textarea
                id="message"
                label="Message"
                className="peer h-96 pt-2"
                required
                placeholder="Bitte gib eine Nachricht ein"
              />
              <label htmlFor="message">Bitte gib eine Nachricht ein</label>
            </div>
            <UniversalButton
              text="Veröffentlichen"
              type="submit"
              modell="success"
              icon="send"
            />
          </form>
          <ErrorMsg isError={isError} />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default WritePost;