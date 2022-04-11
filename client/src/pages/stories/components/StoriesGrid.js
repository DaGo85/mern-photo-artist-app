import { Link } from "react-router-dom";
import { address } from "../../../assets/data";

function StoriesGrid({
  stories,
  currentGridData,

  images,
  setImages,
}) {
  return (
    <section className="card-setup image-grid py-6 justify-center">
      {currentGridData.map((item, index) => {
        return (
          <Link
            to={`/story${item._id}`}
            key={index}
            className="col-span-12 lg:col-span-6 xl:col-span-4 overflow-hidden"
          >
            <img
              className=""
              src={`${address[2].url}${item.photo}`}
              alt="gridimage"
            />
          </Link>
        );
      })}
    </section>
  );
}

export default StoriesGrid;
