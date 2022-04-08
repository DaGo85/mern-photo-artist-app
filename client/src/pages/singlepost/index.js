import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { address, apiroutes } from "../../assets/data";
import OrientedImage from "../../components/elements/OrientedImage";
import PageHeadLine from "../../components/elements/PageHeadline";
import TransitionWrapper from "../../utility/TransitionWrapper";

function SinglePost() {
  const [post, setPost] = useState();

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const PF = address[1].url;

  // Fetching singlepost from the API
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiroutes[2].url}${path}`);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  console.log("test1" + JSON.stringify(post));

  return (
    <TransitionWrapper>
      <main>
        <div className="home-bg bg-setup">
          {post && (
            <>
              <PageHeadLine headline={post.title} />
              <div className="card-setup py-4 md:py-10">
                <OrientedImage
                  orientation={post.orientation}
                  image={post.photo}
                  path={PF}
                  alt="Single blog post"
                />
              </div>
            </>
          )}
        </div>
      </main>
    </TransitionWrapper>
  );
}

export default SinglePost;
