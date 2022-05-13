// Stories page

import StoriesShowCase from "./components/StoriesShowCase";
import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import SubText from "../../components/elements/SubText/SubText";
import StoriesGrid from "./components/StoriesGrid";
import Pagination from "../../components/Pagination/Pagination";

import { apiroutes, subtexts } from "../../assets/data";
import TransitionWrapper from "../../utility/TransitionWrapper";

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

const PageSize = 9;

function Stories() {
  const [stories, setStories] = useState([]);
  const [lastStory, setLastStory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  useEffect(() => {
    const fetchStoryImages = async () => {
      const res = await axios.get(apiroutes[6].url);
      setLastStory(res.data[0]);
      setStories(res.data.slice(1, res.data.length - 1));
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
        <div className="bg-setup">
          <PageHeadLine headline={"Stories"} />
          <SubText subtext={subtexts.stories} />
          {stories.length && <StoriesShowCase story={lastStory} />}
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
