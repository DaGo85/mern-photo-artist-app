// rework or remove

function OrientedImage({ image, path, alt, file, orientation }) {
  return (
    <>
      {file ? (
        orientation === 1 ? (
          <img
            className=""
            alt="Neues Landschaftsbild"
            src={URL.createObjectURL(file)}
          />
        ) : (
          <img alt="Neues Portraitbild" src={URL.createObjectURL(file)} />
        )
      ) : orientation === 1 ? (
        <img
          className="max-h-[85vh] object-cover"
          alt={alt}
          src={path + image}
        />
      ) : (
        <img
          className="max-h-[85vh] object-cover"
          alt={alt}
          src={path + image}
        />
      )}
    </>
  );
}

export default OrientedImage;
