import React from "react";

function GalleryGrid({ currentGridData }) {
  return (
    <section>
      {currentGridData.map((item, index) => {
        return <img key={index} src={item.address} alt="gridimage"></img>;
      })}
    </section>
  );
}

export default GalleryGrid;
