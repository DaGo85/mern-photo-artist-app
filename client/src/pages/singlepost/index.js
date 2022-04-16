import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { address, apiroutes } from "../../assets/data";
import OrientedImage from "../../components/elements/OrientedImage";
import PageHeadLine from "../../components/elements/PageHeadline";
import UniversalButton from "../../components/elements/UniversalButton";
import { useAuthContext } from "../../utility/AuthContextProvider";
import TransitionWrapper from "../../utility/TransitionWrapper";

function SinglePost() {
  const [post, setPost] = useState();

  const { userCreds } = useAuthContext();

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
  }, []);

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
              {userCreds?.name === post.username && post && (
                <Link to={`/singlepostupdate${post._id}`}>
                  <UniversalButton
                    text="Update Post!"
                    modell="select"
                    type="button"
                  />
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
