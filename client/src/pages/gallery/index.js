import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { address, apiroutes, subtexts } from "../../assets/data";
import Pagination from "../../components/Pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import { galleryimages } from "../../assets/mockdata";
import ImageGrid from "../../components/elements/ImageGrid";
import axios from "axios";
import getImageOrientation from "../../utility/getImageOrientation";
import OrientedImage from "../../components/elements/OrientedImage";

const PageSize = 9;

function Gallery() {
  const user = "da";
  const fileRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMode, setDeleteMode] = useState(false);
  const [file, setFile] = useState();
  const [orientation, setOrientation] = useState([]);
  const [images, setImages] = useState([]);

  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  // After deleting an image, this causes rerender of GalleryPagination
  // by fetching the updated imagelist ( probably better to delete item from
  // array manually)
  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`${apiroutes[0].url}/photos`);
      setImages(res.data);
    };
    fetchImages();
  }, []);

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return images.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, images]);

  useEffect(() => {
    executeScroll();
  }, [currentGridData]);

  // Handler for deleting image
  const handleDeleteImg = async (imageid, username) => {
    console.log("test");
    if (username === user) {
      try {
        await axios.delete(`${apiroutes[0].url}${imageid}`, {
          data: { username: username },
        });
      } catch (err) {}
    }
  };

  // Handler for adding image
  //todo: uploadorder
  const handleSubmit = async () => {
    const newPhoto = {
      username: user,
    };

    // Restriction for files: jpeg,jpg and png only, also the size has to be
    // maximal 3000000 ( 3mb )
    if (file) {
      if (file.name.match(/\.(jpeg|jpg|png)$/) && file.size <= 3000000) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPhoto.photo = filename;
        newPhoto.orientation = orientation;
        try {
          await axios.post(`${apiroutes[1].url}`, data);
        } catch (err) {}
        try {
          await axios.post(`${apiroutes[0].url}`, newPhoto);
          setFile(null);
        } catch (err) {}
        // document.getElementById("input-reset").reset();
      } else {
        setFile(null);
      }
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
        <div className="home-bg bg-setup" id="pagination-start">
          <PageHeadLine headline={"Gallery"} />
          <SubText subtext={subtexts.gallery} />
          {user && (
            <>
              {file && (
                <div
                  className="flex flex-col hover:cursor-pointer gap-image text-center"
                  onClick={() => {
                    setFile(null);
                    fileRef.current.value = null;
                  }}
                >
                  <OrientedImage orientation={orientation} file={file} />
                  <h4>
                    Do you want your previous image or an other one? Click me!
                  </h4>
                </div>
              )}
              <button
                onClick={() => setDeleteMode(!deleteMode)}
                className="py-3 px-6 bg-d text-light font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
              >
                Delete Images!
              </button>
              <input
                accept="image/jpg,image/png,image/jpeg"
                className="hidden"
                type="file"
                onChange={handleInput}
                multiple={false}
                ref={fileRef}
              />
              {file ? (
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
                >
                  Upload Image!
                </button>
              ) : (
                <button
                  onClick={() => {
                    fileRef.current.click();
                  }}
                  className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
                >
                  Select Image!
                </button>
              )}
            </>
          )}
          <div ref={myRef} />
          <Pagination
            currentPage={currentPage}
            totalCount={galleryimages.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <ImageGrid
            deleteMode={deleteMode}
            handleDeleteImg={handleDeleteImg}
            currentGridData={currentGridData}
            address={address[0]}
            image={images}
            setImages={setImages}
          />
          <Pagination
            currentPage={currentPage}
            totalCount={galleryimages.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Gallery;
