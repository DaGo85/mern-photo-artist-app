import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { address, apiroutes, subtexts } from "../../assets/data";
import Pagination from "../../components/Pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import { galleryimages } from "../../assets/mockdata";
import ImageGrid from "../../components/elements/ImageGrid";
import axios from "axios";

const PageSize = 9;

function Gallery() {
  const user = "da";
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMode, setDeleteMode] = useState(false);
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

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup" id="pagination-start">
          <PageHeadLine headline={"Gallery"} />
          <SubText subtext={subtexts.gallery} />
          {user && (
            <button
              onClick={() => setDeleteMode(!deleteMode)}
              className="py-3 px-6 bg-d text-light font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300"
            >
              Delete Images!
            </button>
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
