// SingleStory page

import ErrorMsg from "../../components/elements/ErrorMsg/ErrorMsg";
import ImageGrid from "../../components/elements/ImageGrid/ImageGrid";
import BasicImage from "../../components/elements/BasicImage/BasicImage";
import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";
import Pagination from "../../components/Pagination/Pagination";

import { useAuthContext } from "../../utility/AuthContextProvider";
import { apiroutes } from "../../assets/data";
import TransitionWrapper from "../../utility/TransitionWrapper";

import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";
import handleDeleteFirebaseImg from "../../utility/handleDeleteFirebaseImg";

const PageSize = 9;

function SingleStory() {
  const { userCreds } = useAuthContext();
  const fileRef = useRef();
  const myRef = useRef(null);
  const executeScroll = (to) =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: to });

  const [story, setStory] = useState("");
  const [storyImages, setStoryImages] = useState([]);
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState();
  const [url, setUrl] = useState();
  const [deleteMode, setDeleteMode] = useState(false);
  const [rerenderComponent, setRerenderComponent] = useState(false);

  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("story")[1];

  const [currentPage, setCurrentPage] = useState(1);

  // Fetching singlestory from the API
  useEffect(() => {
    const getStory = async () => {
      const res = await axios.get(`${apiroutes[6].url}${path}`);
      setStory(res.data);
    };
    getStory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetches filtered story gallery images
  useEffect(() => {
    const fetchStoryImages = async () => {
      const res = await axios.post(apiroutes[4].url + "storyphotoq", {
        storyPhotoQuery: path,
      });
      setStoryImages(res.data);
    };
    fetchStoryImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderComponent]);

  // Handler for deleting storygalleryimage
  const handleDeleteImg = async (imageid, username, photo) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${userCreds.token}`,
    };

    if (username !== userCreds.name) {
      setIsError("Dieses Bild gehört dir nicht!");
      return;
    }

    try {
      await axios.delete(`${apiroutes[4].url}${imageid}`, {
        data: { username: username },
        headers: headers,
      });
    } catch (err) {
      setIsError(
        "Dieses Foto kann derzeit nicht gelöscht werden, versuche es später noch einmal!"
      );
    }

    handleDeleteFirebaseImg(photo, "stories", setRerenderComponent, setIsError);
  };

  // Handler for adding image
  const handleSubmit = async () => {
    // Restriction for files: jpeg,jpg and png only, also the size has to be
    // maximal 3000000 ( 3mb )

    if (file.name.match(/\.(jpeg|jpg|png)$/) && file.size <= 3000000) {
      setSelected(file);
    } else {
      setIsError("Die Datei ist zu gross!");
      setFile(null);
    }
  };

  useEffect(() => {
    if (url === undefined) return;

    const handleMdb = async () => {
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${userCreds.token}`,
      };

      const newStoryPhoto = {
        username: userCreds.name,
        story: story._id,
        photo: url,
      };

      try {
        await axios.post(apiroutes[4].url, newStoryPhoto, {
          headers: headers,
        });
        setFile(null);
        setRerenderComponent((prevRender) => !prevRender);
      } catch (err) {
        setIsError("standard");
      }
    };

    handleMdb();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return storyImages.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, storyImages]);

  useEffect(() => {
    if (currentPage !== 1) {
      executeScroll("center");
    }
  }, [currentGridData, currentPage]);

  // Handler for input
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
    executeScroll("end");
  };

  const handleSelectFile = () => fileRef.current.click();

  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setIsError(false);
  };

  return (
    <TransitionWrapper>
      <main>
        {story && (
          <div
            className={`bg-setup story-bg `}
            style={{
              "--background": `url(${story.photo})`,
            }}
          >
            <div className="relative w-full flex flex-col items-center justify-start gap-6 md:gap-12">
              {story && (
                <>
                  <PageHeadLine headline={story.story} />
                  <div className="card-setup py-4 md:py-10">
                    <BasicImage
                      image={story.photo}
                      alt="Einzelnes Story Bild"
                    />
                  </div>
                  <div className="card-setup text-setup py-4 md:py-10">
                    <h5>Author: {story.username}</h5>
                    <hr className="w-full" />
                    <h6>
                      Erstellt am: {new Date(story.createdAt).toDateString()}
                    </h6>
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
                            Klick hier, wenn du ein anderes Bild wählen
                            möchtest!
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
              {selected && (
                <ProgressBar
                  selected={selected}
                  setSelected={setSelected}
                  setUrl={setUrl}
                  folder="stories"
                />
              )}
              <ErrorMsg isError={isError} />
              <div ref={myRef} />
              {storyImages && (
                <>
                  <Pagination
                    currentPage={currentPage}
                    totalCount={storyImages.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                  <ImageGrid
                    deleteMode={deleteMode}
                    handleDeleteImg={handleDeleteImg}
                    currentGridData={currentGridData}
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
          </div>
        )}
      </main>
    </TransitionWrapper>
  );
}

export default SingleStory;
