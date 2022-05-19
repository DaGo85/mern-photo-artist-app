// WriteStory page

import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";
import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import SubText from "../../components/elements/SubText/SubText";
import BasicImage from "../../components/elements/BasicImage/BasicImage";
import ErrorMsg from "../../components/elements/ErrorMsg/ErrorMsg";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";

import { apiroutes, subtexts } from "../../assets/data";
import TransitionWrapper from "../../utility/TransitionWrapper";
import { useAuthContext } from "../../utility/AuthContextProvider";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function WriteStory() {
  const { userCreds } = useAuthContext();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [url, setUrl] = useState();
  const [selected, setSelected] = useState();
  const [isError, setIsError] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();

  //Handler for submitting a new story
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Restriction for files: jpeg,jpg and png only, also the size has to be
    // maximal 3000000 ( 3mb )
    if (file) {
      if (file.name.match(/\.(jpeg|jpg|png)$/) && file.size <= 3000000) {
        setSelected(file);
      } else {
        setIsError("Die Datei ist zu gross!");
        setFile(null);
      }
    }
  };

  useEffect(() => {
    if (url === undefined) return;

    const handleMdb = async () => {
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${userCreds.token}`,
      };

      const newStory = {
        username: userCreds?.name,
        story: title,
        desc: desc,
        photo: url,
      };

      try {
        const res = await axios.post(apiroutes[6].url, newStory, {
          headers: headers,
        });
        navigate("/story" + res.data._id);
      } catch (err) {
        setIsError("standard");
        return;
      }
      setIsError(false);
    };

    handleMdb();
  }, [url, userCreds, navigate, desc, title]);

  return (
    <TransitionWrapper>
      <main>
        <div className="impressum-bg bg-setup">
          <PageHeadLine headline={"Story"} />
          <SubText subtext={subtexts.writestory} />
          <div className="card-setup py-4 md:py-10">
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
            onChange={(e) => setFile(e.target.files[0])}
            multiple={false}
            ref={fileRef}
          />
          {selected && (
            <ProgressBar
              selected={selected}
              setSelected={setSelected}
              setUrl={setUrl}
              folder="stories"
            />
          )}
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
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title">Bitte gib einen Titel ein</label>
            </div>
            <div className="w-full relative">
              <textarea
                id="story"
                label="Story"
                className="peer h-96 pt-2"
                required
                placeholder="Bitte gib eine Story ein"
                onChange={(e) => setDesc(e.target.value)}
              />
              <label htmlFor="story">Bitte gib eine Story ein</label>
            </div>
            <UniversalButton
              text="Publish"
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

export default WriteStory;
