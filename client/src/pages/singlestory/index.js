import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { address, apiroutes } from "../../assets/data";
import ImageGrid from "../../components/elements/ImageGrid";
import OrientedImage from "../../components/elements/OrientedImage";
import PageHeadLine from "../../components/elements/PageHeadline";
import Pagination from "../../components/Pagination";
import TransitionWrapper from "../../utility/TransitionWrapper";

const PageSize = 1;

function SingleStory() {
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  const [story, setStory] = useState();
  const [storyImages, setStoryImages] = useState([]);

  const location = useLocation();
  const path = location.pathname.split("story")[1];
  const PF = address[2].url;

  const user = "DG";

  const [currentPage, setCurrentPage] = useState(1);

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return storyImages.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, storyImages]);

  // Fetching singlestory from the API
  // Fetches and filters all story gallery images
  useEffect(() => {
    const getStory = async () => {
      const res = await axios.get(`${apiroutes[6].url}${path}`);
      setStory(res.data);
    };
    const fetchStoryImages = async () => {
      const res = await axios.get(apiroutes[4].url);
      setStoryImages(res.data.filter((i) => i.story === path));
    };
    fetchStoryImages();
    getStory();
  }, [path]);

  useEffect(() => {
    executeScroll();
  }, [currentGridData]);

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          {story && (
            <>
              <PageHeadLine headline={story.title} />
              <div className="card-setup py-4 md:py-10">
                <OrientedImage
                  orientation={story.orientation}
                  image={story.photo}
                  path={PF}
                  alt="Single story"
                />
              </div>
              <div className="card-setup text-setup py-4 md:py-10">
                <h5>Author: {story.username}</h5>
                <hr className="w-full" />
                <h6>Created: {new Date(story.createdAt).toDateString()}</h6>
                <h6>Last Update: {new Date(story.updatedAt).toDateString()}</h6>
              </div>
              <div className="card-setup text-setup py-4 md:py-10">
                <pre>
                  <p className="whitespace-pre-line">{story.desc}</p>
                </pre>
              </div>
              {user === story.username && story && (
                <Link to="/singlepostupdate" state={story}>
                  <button className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300">
                    Update Story
                  </button>
                </Link>
              )}
            </>
          )}
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
