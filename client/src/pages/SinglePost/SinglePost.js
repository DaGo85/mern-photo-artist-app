//SinglePost page

import BasicImage from "../../components/elements/BasicImage/BasicImage";
import PageHeadLine from "../../components/elements/PageHeadline/PageHeadLine";
import UniversalButton from "../../components/elements/UniversalButton/UniversalButton";
import SkeletonPreview from "../../skeletons/SkeletonPreview";

import { apiroutes } from "../../assets/data";
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

  // Fetching singlepost from the API
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiroutes[2].url}${path}`);
      setPost(res.data);
    };
    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TransitionWrapper>
      <main>
        <article className={`bg-setup ${bg}`}>
          {post ? (
            <>
              <PageHeadLine headline={post.title} />
              <div className="py-4 card-setup md:py-10">
                <BasicImage image={post.photo} alt="Einzelner blog Post" />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 py-4 card-setup md:py-10">
                <h5>Autor: {post.username}</h5>
                <hr className="w-full" />
                <h6>
                  Erstellt am: {new Date(post.createdAt).toLocaleDateString()}
                </h6>
                <h6>
                  Letztes Update:{" "}
                  {new Date(post.updatedAt).toLocaleDateString()}
                </h6>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 py-4 card-setup md:py-10">
                <pre>
                  <p className="whitespace-pre-line ">{post.desc}</p>
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
          ) : (
            <SkeletonPreview />
          )}
        </article>
      </main>
    </TransitionWrapper>
  );
}

export default SinglePost;
