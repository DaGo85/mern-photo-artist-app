// SingleStory page

import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { address, apiroutes } from "../../assets/data";
import ErrorMsg from "../../components/elements/ErrorMsg";
import ImageGrid from "../../components/elements/ImageGrid";
import BasicImage from "../../components/elements/BasicImage";
import PageHeadLine from "../../components/elements/PageHeadline";
import UniversalButton from "../../components/elements/UniversalButton";
import Pagination from "../../components/Pagination";
import { useAuthContext } from "../../utility/AuthContextProvider";
import TransitionWrapper from "../../utility/TransitionWrapper";
import useGetBackGround from "../../utility/useGetBackGround";

const PageSize = 9;

function SingleStory() {
  const { userCreds } = useAuthContext();
  const fileRef = useRef();
  const myRef = useRef(null);
  const executeScroll = (to) =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: to });

  const [story, setStory] = useState();
  const [storyImages, setStoryImages] = useState([]);
  const [file, setFile] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [rerenderComponent, setRerenderComponent] = useState(false);
  const bg = useGetBackGround();

  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("story")[1];
  const PF = address[2].url;

  const [currentPage, setCurrentPage] = useState(1);

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return storyImages.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, storyImages]);

  // Fetching singlestory from the API

  useEffect(() => {
    const getStory = async () => {
      const res = await axios.get(`${apiroutes[6].url}${path}`);
      setStory(res.data);
    };
    getStory();
  }, []);

  // Fetches and filters all story gallery images todo: let BE filter

  useEffect(() => {
    const fetchStoryImages = async () => {
      const res = await axios.post(apiroutes[4].url + "storyphotoq", {
        storyPhotoQuery: path,
      });
      setStoryImages(res.data);
    };
    fetchStoryImages();
  }, [rerenderComponent]);

  //Handler for submitting a photo for singlestory
  const handleSubmit = async () => {
    const newStoryPhoto = {
      username: userCreds.name,
      story: story._id,
    };
    // Restriction for files: jpeg,jpg and png only, also the size has to be
    // maximal 3000000 ( 3mb )
    if (file) {
      if (file.name.match(/\.(jpeg|jpg|png)$/) && file.size <= 3000000) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newStoryPhoto.photo = filename;
        //Uploading file to server
        try {
          await axios.post(apiroutes[5].url, data);
        } catch (err) {
          setIsError("standard");
        }
        //Posting  on MongoDB
        try {
          await axios.post(apiroutes[4].url, newStoryPhoto);
          setFile(null);
        } catch (err) {
          setIsError("standard");
        }
        setRerenderComponent(!rerenderComponent);
        // document.getElementById("form-reset").reset();
      } else {
        setIsError("Die Datei ist zu gross!");
        setFile(null);
      }
    }
  };

  // Handler for input
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
    executeScroll("end");
  };

  useEffect(() => {
    if (currentPage !== 1) {
      executeScroll("center");
    }
  }, [currentGridData, currentPage]);

  // Handler for deleting image
  const handleDeleteImg = async (imageid, username) => {
    if (username === userCreds.name) {
      try {
        await axios.delete(`${apiroutes[4].url}${imageid}`, {
          data: { username: username },
        });
      } catch (err) {
        setIsError(
          "Dieses Foto kann derzeit nicht gelöscht werden, versuche es später noch einmal!"
        );
      }
      setRerenderComponent(!rerenderComponent);
    }
  };

  const handleSelectFile = () => fileRef.current.click();
  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setIsError(false);
  };

  return (
    <TransitionWrapper>
      <main>
        <div className={`bg-setup ${bg}`}>
          {story && (
            <>
              <PageHeadLine headline={story.story} />
              <div className="card-setup py-4 md:py-10">
                <BasicImage
                  image={story.photo}
                  path={PF}
                  alt="Einzelnes Story Bild"
                />
              </div>
              <div className="card-setup text-setup py-4 md:py-10">
                <h5>Author: {story.username}</h5>
                <hr className="w-full" />
                <h6>Erstellt am: {new Date(story.createdAt).toDateString()}</h6>
                <h6>
                  Letztes Update: {new Date(story.updatedAt).toDateString()}
                </h6>
              </div>
              <div className="card-setup text-setup py-4 md:py-10">
                <pre>
                  <p className="whitespace-pre-line">{story.desc}</p>
                </pre>
              </div>
              {userCreds?.name === story.username && (
                <>
                  <Link to={`/singlestoryupdate${story._id}`}>
                    <UniversalButton
                      text="Update Story"
                      type="button"
                      modell="success"
                      icon="update"
                    />
                  </Link>
                  <input
                    accept="image/jpg,image/png,image/jpeg"
                    className="hidden"
                    type="file"
                    onChange={handleInput}
                    multiple={false}
                    ref={fileRef}
                  />
                  {file && (
                    <div
                      className="flex flex-col hover:cursor-pointer gap-image text-center card-setup py-4 md:py-10 max-w-7xl"
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
                  )}
                  {file ? (
                    <UniversalButton
                      text="Bild hochladen!"
                      type="button"
                      modell="success"
                      handler={handleSubmit}
                      icon="upload"
                    />
                  ) : (
                    <UniversalButton
                      text="Bild aussuchen!"
                      type="button"
                      modell="select"
                      handler={handleSelectFile}
                      icon="selectImage"
                    />
                  )}
                  {deleteMode ? (
                    <UniversalButton
                      text="Modus deaktivieren!"
                      handler={handleDeleteMode}
                      modell="delete"
                      type="button"
                      icon="trashStrike"
                    />
                  ) : (
                    <UniversalButton
                      text="Löschmodus!"
                      handler={handleDeleteMode}
                      modell="delete"
                      type="button"
                      icon="trash"
                    />
                  )}
                </>
              )}
            </>
          )}
          <ErrorMsg isError={isError} />
          <div ref={myRef} />
          {story && (
            <>
              <Pagination
                currentPage={currentPage}
                totalCount={storyImages.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
              <ImageGrid
                currentGridData={currentGridData}
                address={address[2]}
                handleDeleteImg={handleDeleteImg}
                deleteMode={deleteMode}
                images={storyImages}
              />
              <Pagination
                currentPage={currentPage}
                totalCount={storyImages.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SingleStory;
