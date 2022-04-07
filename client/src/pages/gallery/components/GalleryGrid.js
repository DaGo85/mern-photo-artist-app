import { address } from "../../../assets/data";

function GalleryGrid({ currentGridData }) {
  return (
    <section className="card-setup image-grid py-6 justify-center">
      {currentGridData.map((item, index) => {
        return (
          <div
            key={index}
            className="col-span-12 lg:col-span-6 xl:col-span-4 overflow-hidden"
          >
            <img
              className=" "
              src={`${address[0].url}${item.photo}`}
              alt="gridimage"
            />
          </div>
        );
      })}
    </section>
  );
}

export default GalleryGrid;
