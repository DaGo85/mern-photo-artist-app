import React from "react";

function OrientedImage({ image, path, alt, file, orientation }) {
  return (
    <>
      {file ? (
        orientation === 1 ? (
          <img
            className=""
            alt="New landscape"
            src={URL.createObjectURL(file)}
          />
        ) : (
          <img alt="New portrait" src={URL.createObjectURL(file)} />
        )
      ) : orientation === 1 ? (
        <img alt="New landscape" src={path + image} />
      ) : (
        <img alt="New portrait" src={path + image} />
      )}
    </>
  );
}

export default OrientedImage;
