//SinglePost page

import BasicImage from "../../components/elements/BasicImage/BasicImage";
import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";

import { address, apiroutes } from "../../assets/data";
import { useAuthContext } from "../../utility/AuthContextProvider";
import TransitionWrapper from "../../utility/TransitionWrapper";
import useGetBackGround from "../../utility/useGetBackGround";

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function SinglePost() {
  const [post, setPost] = useState();
  const bg = useGetBackGround();

  const { userCreds } = useAuthContext();

  const location = useLocation();
  const path = location.pathname.split("/post")[1];
  const PF = address[1].url;

  // Fetching singlepost from the API
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiroutes[2].url}${path}`);
      setPost(res.data);
    };
    getPost();
  }, []);

  return (
    <TransitionWrapper>
      <main>
        <div className={`bg-setup ${bg}`}>
          {post && (
            <>
              <PageHeadLine headline={post.title} />
              <div className="card-setup py-4 md:py-10">
                <BasicImage
                  image={post.photo}
                  path={PF}
                  alt="Einzelner blog Post"
                />
              </div>
              <div className="card-setup text-setup py-4 md:py-10">
                <h5>Author: {post.username}</h5>
                <hr className="w-full" />
                <h6>Erstellt am: {new Date(post.createdAt).toDateString()}</h6>
                <h6>
                  Letztes Update: {new Date(post.updatedAt).toDateString()}
                </h6>
              </div>
              <div className="card-setup text-setup py-4 md:py-10">
                <pre>
                  <p className="whitespace-pre-line">{post.desc}</p>
                </pre>
              </div>
              {userCreds?.name === post.username && post && (
                <Link to={`/singlepostupdate${post._id}`}>
                  <UniversalButton
                    text="Update Blog Post!"
                    modell="select"
                    type="button"
                    icon="update"
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
