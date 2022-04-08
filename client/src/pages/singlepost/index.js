import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { address, apiroutes } from "../../assets/data";
import OrientedImage from "../../components/elements/OrientedImage";
import PageHeadLine from "../../components/elements/PageHeadline";
import TransitionWrapper from "../../utility/TransitionWrapper";

function SinglePost() {
  const [post, setPost] = useState();

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const PF = address[1].url;

  const user = "DG";

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
              <div className="card-setup text-setup py-4 md:py-10">
                <h5>Author: {post.username}</h5>
                <hr className="w-full" />
                <h6>Created: {new Date(post.createdAt).toDateString()}</h6>
                <h6>Last Update: {new Date(post.updatedAt).toDateString()}</h6>
              </div>
              <div className="card-setup text-setup py-4 md:py-10">
                <pre>
                  <p className="whitespace-pre-line">{post.desc}</p>
                </pre>
              </div>
              {user === post.username && post && (
                <Link to="/singlepostupdate" state={post}>
                  <button className="py-3 px-6 bg-d text-white font-medium rounded hover:bg-a hover:text-d cursor-pointer ease-in-out duration-300">
                    Update Post
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

export default SinglePost;
