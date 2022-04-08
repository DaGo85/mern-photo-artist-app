import React from "react";
import { address } from "../../../assets/data";
import OrientedImage from "../../../components/elements/OrientedImage";

function HomeBlogCards({ currentGridData }) {
  const PF = address[1].url;
  return (
    <section className="flex flex-col gap-form">
      {currentGridData.map((post, index) => {
        return post.orientation === 1 ? (
          <div className="card-setup gap-form py-form" key={post.title}>
            <OrientedImage
              orientation={post.orientation}
              image={post.photo}
              path={PF}
              alt="Single blog post"
            />
            <h5>Author: {post.username}</h5>
            <hr className="w-full" />
            <h6>Created: {new Date(post.createdAt).toDateString()}</h6>
            <h6>Last Update: {new Date(post.updatedAt).toDateString()}</h6>
            <hr className="w-full" />
            <pre>
              <p className="whitespace-pre-line">{post.desc}</p>
            </pre>
          </div>
        ) : (
          <div
            className={`card-setup gap-form py-form ${
              index % 2 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            key={post.title}
          >
            <OrientedImage
              orientation={post.orientation}
              image={post.photo}
              path={PF}
              alt="Single blog post"
            />
            <div className="flex flex-col">
              <h5>Author: {post.username}</h5>
              <hr className="w-full" />
              <h6>Created: {new Date(post.createdAt).toDateString()}</h6>
              <h6>Last Update: {new Date(post.updatedAt).toDateString()}</h6>
              <hr className="w-full" />
              <pre>
                <p className="whitespace-pre-line">{post.desc}</p>
              </pre>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default HomeBlogCards;
