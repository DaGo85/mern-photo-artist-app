import TransitionWrapper from "../../utility/TransitionWrapper";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { apiroutes, subtexts } from "../../assets/data";
import StoriesShowCase from "./components/StoriesShowCase";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import StoriesGrid from "./components/StoriesGrid";
import Pagination from "../../components/Pagination";

const PageSize = 2;

function Stories() {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  useEffect(() => {
    const fetchStoryImages = async () => {
      const res = await axios.get(apiroutes[6].url);
      setStories(res.data);
    };
    fetchStoryImages();
  }, []);

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return stories.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, stories]);

  useEffect(() => {
    if (currentPage !== 1) {
      executeScroll();
    }
  }, [currentGridData, currentPage]);

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Stories"} />
          <SubText subtext={subtexts.stories} />
          {stories.length && <StoriesShowCase story={stories[0]} />}
          <div ref={myRef} />
          <Pagination
            currentPage={currentPage}
            totalCount={stories.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
          {stories.length && <StoriesGrid currentGridData={currentGridData} />}
          <Pagination
            currentPage={currentPage}
            totalCount={stories.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default Stories;
