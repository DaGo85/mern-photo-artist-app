import { Link } from "react-router-dom";
import { address } from "../../../assets/data";
import OrientedImage from "../../../components/elements/OrientedImage";

function StoriesShowCase({ story }) {
  console.log("first" + JSON.stringify(story));
  const PF = address[2].url;
  // Trimmed strings for portrait images
  // Maximum number of characters to extract

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
  );

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
  return story.orientation === 1 ? (
    <Link
      to={`/story${story._id}`}
      className="card-setup gap-form py-form"
      key={story.story}
    >
      <OrientedImage
        orientation={story.orientation}
        image={story.photo}
        path={PF}
        alt="Single story post"
      />
      <h4 className="pb-2 md:pb-4 lg:pb-6">{story.story}</h4>
      <h5>Author: {story.username}</h5>
      <hr className="w-full" />
      <h6>Created: {new Date(story.createdAt).toDateString()}</h6>
      <h6>Last Update: {new Date(story.updatedAt).toDateString()}</h6>
      <hr className="w-full" />
      <pre>
        <p className="whitespace-pre-line">{trimmedStringLandscape}</p>
      </pre>
    </Link>
  ) : (
    <Link
      to={`/${story._id}`}
      className="card-setup gap-form py-form"
      key={story.story}
    >
      <OrientedImage
        orientation={story.orientation}
        image={story.photo}
        path={PF}
        alt="Single story post"
      />
      <div className="flex flex-col">
        <h4 className="pb-2 md:pb-4 lg:pb-6">{story.story}</h4>
        <h5>Author: {story.username}</h5>
        <hr className="w-full" />
        <h6>Created: {new Date(story.createdAt).toDateString()}</h6>
        <h6>Last Update: {new Date(story.updatedAt).toDateString()}</h6>
        <hr className="w-full" />
        <pre>
          <p className="whitespace-pre-line">{trimmedStringPortrait}</p>
        </pre>
      </div>
    </Link>
  );
}

export default StoriesShowCase;
