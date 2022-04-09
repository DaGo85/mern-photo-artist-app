import React from "react";
import { address } from "../../../assets/data";
import OrientedImage from "../../../components/elements/OrientedImage";

function HomeBlogCards({ currentGridData }) {
  const PF = address[1].url;
  return (
    <section className="flex flex-col gap-form">
      {currentGridData.map((post, index) => {
        // Trimmed strings for portrait images
        // Maximum number of characters to extract

        const maxLengthPortrait = 600;

        // Trim the string to the maximum length
        let trimmedStringPortrait = post.desc.substr(0, maxLengthPortrait);
        // Re-trim if it ended in the middle of a word
        trimmedStringPortrait = trimmedStringPortrait.substr(
          0,
          Math.min(
            trimmedStringPortrait.length,
            trimmedStringPortrait.lastIndexOf(" ")
          )
        );

        // Trimmed strings for landscape images
        // Maximum number of characters to extract
        const maxLengthLandscape = 600;

        // Trim the string to the maximum length
        let trimmedStringLandscape = post.desc.substr(0, maxLengthLandscape);

        // Re-trim if it ended in the middle of a word
        trimmedStringLandscape = trimmedStringLandscape.substr(
          0,
          Math.min(
            trimmedStringLandscape.length,
            trimmedStringLandscape.lastIndexOf(" ")
          )
        );

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
              <p className="whitespace-pre-line">{trimmedStringLandscape}</p>
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
                <p className="whitespace-pre-line">{trimmedStringPortrait}</p>
              </pre>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default HomeBlogCards;
