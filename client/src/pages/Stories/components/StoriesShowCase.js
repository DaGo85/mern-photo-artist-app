// Showcase for the last story

import BasicImage from "../../../components/elements/BasicImage/BasicImage";

import { Link } from "react-router-dom";

//todo:rework
function StoriesShowCase({ story }) {
  // Trimmed strings for portrait images
  // Maximum number of characters to extract
  /*
  const maxLengthPortrait = 600;

  // Trim the string to the maximum length
  let trimmedStringPortrait = story.desc.substr(0, maxLengthPortrait);
  // Re-trim if it ended in the middle of a word

  trimmedStringPortrait = trimmedStringPortrait.substr(
    0,
    Math.min(
      trimmedStringPortrait.length,
      trimmedStringPortrait.lastIndexOf(" ")
    )
  ); */

  // Trimmed strings for landscape images
  // Maximum number of characters to extract
  const maxLengthLandscape = 600;

  // Trim the string to the maximum length
  let trimmedStringLandscape = story.desc.substr(0, maxLengthLandscape);

  // Re-trim if it ended in the middle of a word
  trimmedStringLandscape = trimmedStringLandscape.substr(
    0,
    Math.min(
      trimmedStringLandscape.length,
      trimmedStringLandscape.lastIndexOf(" ")
    )
  );

  return (
    <Link
      to={`/story${story._id}`}
      className="card-setup gap-form py-form max-w-screen-xl"
      key={story.story}
    >
      <h3 className="text-slate-100">Zuletzt hinzugefügte Story</h3>
      <BasicImage image={story.photo} alt="Einzelner Story Post" />
      <h4 className="pb-2 md:pb-4 lg:pb-6">{story.story}</h4>
      <h5>Author: {story.username}</h5>
      <hr className="w-full" />
      <h6>Erstellt am: {new Date(story.createdAt).toDateString()}</h6>
      <h6>Letztes Update: {new Date(story.updatedAt).toDateString()}</h6>
      <hr className="w-full" />
      <pre>
        <p className="whitespace-pre-line">{trimmedStringLandscape}</p>
      </pre>
    </Link>
  );
}

export default StoriesShowCase;
