import TransitionWrapper from "../../utility/TransitionWrapper";
import axios from "axios";
import PageHeadLine from "../../components/elements/PageHeadline";
import SubText from "../../components/elements/SubText";
import { apiroutes, subtexts } from "../../assets/data";
import RandomImage from "../../components/elements/RandomImage";
import { useEffect, useMemo, useRef, useState } from "react";
import Pagination from "../../components/Pagination";
import HomeBlogCards from "./components/HomeBlogCards";
import ImageModal from "../../components/ImageModal";

const PageSize = 6;

function Home() {
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  //Initial useEffect for fetching Home data
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(apiroutes[2].url);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (currentPage !== 1) {
      executeScroll();
    }
  }, [currentGridData, currentPage]);

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          <PageHeadLine headline={"Home"} />
          <SubText subtext={subtexts.home} />
          <RandomImage />
          <div ref={myRef} />
          {posts && (
            <>
              <Pagination
                currentPage={currentPage}
                totalCount={posts.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
              <HomeBlogCards currentGridData={currentGridData} />
              <Pagination
                currentPage={currentPage}
                totalCount={posts.length}
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

export default Home;
