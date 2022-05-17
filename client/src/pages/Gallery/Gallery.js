// Gallery page

import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import SubText from "../../components/elements/SubText/SubText";
import Pagination from "../../components/Pagination/Pagination";
import ImageGrid from "../../components/elements/ImageGrid/ImageGrid";
import BasicImage from "../../components/elements/BasicImage/BasicImage";
import ErrorMsg from "../../components/elements/ErrorMsg/ErrorMsg";
import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";

import TransitionWrapper from "../../utility/TransitionWrapper";
import { useAuthContext } from "../../utility/AuthContextProvider";
import { address, apiroutes, subtexts } from "../../assets/data";
import useGetBackGround from "../../utility/useGetBackGround";

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import ProgressBar from "../../components/elements/ProgressBar/ProgressBar";

// todo: BE security for multer delete
const PageSize = 9;

function Gallery() {
  const { userCreds } = useAuthContext();
  const fileRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMode, setDeleteMode] = useState(false);
  const [file, setFile] = useState();
  const [selected, setSelected] = useState();
  const [url, setUrl] = useState();
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false);
  const bg = useGetBackGround();

  const [rerenderComponent, setRerenderComponent] = useState(false);

  const myRef = useRef(null);
  const executeScroll = (to) =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: to });

  // After deleting an image, this causes rerender of GalleryPagination
  // by fetching the updated imagelist ( probably better to delete item from
  // array manually)
  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`${apiroutes[0].url}/photos`);
      setImages(res.data);
    };
    fetchImages();
  }, [rerenderComponent]);

  // Handler for deleting image
  const handleDeleteImg = async (imageid, username) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${userCreds.token}`,
    };

    if (username === userCreds.name) {
      try {
        await axios.delete(`${apiroutes[0].url}${imageid}`, {
          data: { username: userCreds.name },
          headers: headers,
        });
      } catch (err) {
        setIsError(
          "Dieses Foto kann derzeit nicht gelöscht werden, versuche es später noch einmal!"
        );
      }
      setRerenderComponent(!rerenderComponent);
    }
  };

  // Handler for adding image
  //todo: uploadorder
  const handleSubmit = async () => {
    const newPhoto = {
      username: userCreds.name,
    };

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${userCreds.token}`,
    };

    // Restriction for files: jpeg,jpg and png only, also the size has to be
    // maximal 3000000 ( 3mb )
    if (file) {
      if (file.name.match(/\.(jpeg|jpg|png)$/) && file.size <= 3000000) {
        setSelected(file);

        newPhoto.photo = url;
        try {
          await axios.post(`${apiroutes[0].url}`, newPhoto, {
            headers: headers,
          });
          setFile(null);
          setUrl(null);
        } catch (err) {
          setIsError("standard");
        }
        setRerenderComponent(!rerenderComponent);
        // document.getElementById("input-reset").reset();
      } else {
        setIsError("Die Datei ist zu gross!");
        setFile(null);
      }
    }
  };

  // Handler for input
  const handleInput = async (e) => {
    setFile(e.target.files[0]);
    executeScroll("nearest");
  };

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return images.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, images]);

  useEffect(() => {
    executeScroll("nearest");
  }, [currentGridData]);

  const handleSelectFile = () => {
    fileRef.current.click();
    setIsError(false);
  };

  const handleDelete = () => {
    setDeleteMode(!deleteMode);
    setIsError(false);
  };

  return (
    <TransitionWrapper>
      <main>
        <div className={`bg-setup ${bg}`} id="pagination-start">
          <PageHeadLine headline={"Gallerie"} />
          <SubText subtext={subtexts.gallery} />
          <div ref={myRef} />
          {userCreds?.name && (
            <>
              {file && (
                <div
                  className="flex flex-col hover:cursor-pointer gap-image text-center card-setup py-4 md:py-10 max-w-7xl"
                  onClick={() => {
                    setFile(null);
                    fileRef.current.value = null;
                  }}
                >
                  <BasicImage file={file} />
                  <h4>Klick hier, wenn du ein anderes Bild wählen möchtest!</h4>
                </div>
              )}
              {file ? (
                <UniversalButton
                  text="Bild hochladen!"
                  handler={handleSubmit}
                  modell="success"
                  type="button"
                  icon="upload"
                />
              ) : (
                <UniversalButton
                  text="Bild auswählen!"
                  handler={handleSelectFile}
                  modell="select"
                  type="button"
                  icon="selectImage"
                />
              )}
              {deleteMode ? (
                <UniversalButton
                  text="Modus deaktivieren!"
                  handler={handleDelete}
                  modell="delete"
                  type="button"
                  icon="trashStrike"
                />
              ) : (
                <UniversalButton
                  text="Löschmodus!"
                  handler={handleDelete}
                  modell="delete"
                  type="button"
                  icon="trash"
                />
              )}
              <input
                accept="image/jpg,image/png,image/jpeg"
                className="hidden"
                type="file"
                onChange={handleInput}
                multiple={false}
                ref={fileRef}
              />
            </>
          )}
          {selected && (
            <ProgressBar
              selected={selected}
              setSelected={setSelected}
              setUrl={setUrl}
            />
          )}
          <ErrorMsg isError={isError} />
          <Pagination
            currentPage={currentPage}
            totalCount={images.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <ImageGrid
            deleteMode={deleteMode}
            handleDeleteImg={handleDeleteImg}
            currentGridData={currentGridData}
            address={address[0]}
            images={images}
          />
          <Pagination
            currentPage={currentPage}
            totalCount={images.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Gallery;
