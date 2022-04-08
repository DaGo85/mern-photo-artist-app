import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { address, apiroutes } from "../../assets/data";
import OrientedImage from "../../components/elements/OrientedImage";
import PageHeadLine from "../../components/elements/PageHeadline";
import TransitionWrapper from "../../utility/TransitionWrapper";

function SingleStory() {
  const [story, setStory] = useState();
  const [storyImages, setStoryImages] = useState([]);

  const location = useLocation();
  const path = location.pathname.split("story")[1];
  const PF = address[2].url;

  const user = "DG";

  // Fetching singlestory from the API
  useEffect(() => {
    const getStory = async () => {
      const res = await axios.get(`${apiroutes[6].url}${path}`);
      setStory(res.data);
    };
    getStory();
  }, [path]);

  // Fetches and filters all story gallery images
  useEffect(() => {
    const fetchStoryImages = async () => {
      const res = await axios.get(apiroutes[4].url);
      setStoryImages(res.data.filter((i) => i.story === path));
    };
    fetchStoryImages();
    console.log("testtest");
  }, [path]);

  console.log("story");

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
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SingleStory;
