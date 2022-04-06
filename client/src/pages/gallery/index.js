import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { subtexts } from "../../assets/data";
import Pagination from "../../components/Pagination";
import { useMemo, useState } from "react";
import { galleryimages } from "../../assets/mockdata";
import GalleryGrid from "./components/GalleryGrid";

let PageSize = 9;

function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return galleryimages.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Gallery"} />
          <SubText subtext={subtexts.gallery} />
          <GalleryGrid currentGridData={currentGridData} />
          <Pagination
            className="pagination-bar"
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
