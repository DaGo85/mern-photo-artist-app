// Generic Image

function BasicImage({ image, path, alt, file }) {
  return (
    <>
      {file ? (
        <img alt="Neues Bild zum hochladen" src={URL.createObjectURL(file)} />
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

export default BasicImage;
