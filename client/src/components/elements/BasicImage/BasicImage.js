// Generic Image

function BasicImage({ image, alt, file }) {
  return (
    <>
      {file ? (
        <img alt="Neues Bild zum hochladen" src={URL.createObjectURL(file)} />
      ) : (
        <img className="max-h-[85vh] object-cover" alt={alt} src={image} />
      )}
    </>
  );
}

export default BasicImage;
