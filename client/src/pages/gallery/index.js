import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { address, subtexts } from "../../assets/data";
import Pagination from "../../components/Pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import { galleryimages } from "../../assets/mockdata";
import ImageGrid from "../../components/elements/ImageGrid";

const PageSize = 9;

function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return galleryimages.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    executeScroll();
  }, [currentGridData]);

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup" id="pagination-start">
          <PageHeadLine headline={"Gallery"} />
          <SubText subtext={subtexts.gallery} />
          <div ref={myRef} />
          <Pagination
            currentPage={currentPage}
            totalCount={galleryimages.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <ImageGrid currentGridData={currentGridData} address={address[0]} />
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
