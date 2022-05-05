// HomeBlogCard component for Home

import { Link } from "react-router-dom";
import { address } from "../../../assets/data";

function HomeBlogCards({ currentGridData }) {
  const PF = address[1].url;
  return (
    <section className="flex flex-col gap-form max-w-7xl">
      {currentGridData.map((post, index) => {
        // Trimmed strings for portrait images
        // Maximum number of characters to extract

        const maxLengthPortrait = 450;

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
          <Link
            to={`/post${post._id}`}
            className="card-setup gap-form py-form "
            key={post.title}
          >
            <img
              className="object-cover "
              src={PF + post.photo}
              alt="Einzelner blog Post mit Landschaftsbild"
            />
            <h4 className="pb-2 md:pb-4 lg:pb-6">{post.title}</h4>
            <h5>Author: {post.username}</h5>
            <hr className="w-full" />
            <h6>Erstellt am: {new Date(post.createdAt).toDateString()}</h6>
            <h6>Letztes Update: {new Date(post.updatedAt).toDateString()}</h6>
            <hr className="w-full" />
            <pre>
              <p className="whitespace-pre-line font-sans">
                {trimmedStringLandscape}...
              </p>
            </pre>
          </Link>
        ) : (
          <Link
            to={`/post${post._id}`}
            className={`card-setup gap-form py-form justify-between w-full md:max-h-[60vh] ${
              index % 2 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            key={post.title}
          >
            <div className="md:max-w-[50%] flex justify-center w-full">
              <img
                className="object-cover md:max-h-[55vh] overflow-hidden"
                src={PF + post.photo}
                alt="Einzelner blog Post mit Portraitbild"
              />
            </div>
            <div className="flex flex-col md:max-w-[50%] grow md:max-h-[55vh] overflow-hidden">
              <h4 className="pb-2 md:pb-4 lg:pb-6">{post.title}</h4>
              <h5>Author: {post.username}</h5>
              <hr className="w-full" />
              <h6>Erstellt am: {new Date(post.createdAt).toDateString()}</h6>
              <h6>Letztes Update: {new Date(post.updatedAt).toDateString()}</h6>
              <hr className="w-full" />
              <pre>
                <p className="whitespace-pre-line font-sans">
                  {trimmedStringPortrait}...
                </p>
              </pre>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default HomeBlogCards;
