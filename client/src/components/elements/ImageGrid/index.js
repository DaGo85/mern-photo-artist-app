function ImageGrid({ currentGridData, address, handleDeleteImg, deleteMode }) {
  const user = "da";
  return (
    <section className="card-setup image-grid py-6 justify-center">
      {deleteMode
        ? currentGridData.map((item, index) => {
            return (
              <div
                key={index}
                className="col-span-12 lg:col-span-6 xl:col-span-4 overflow-hidden"
              >
                <img
                  className=""
                  src={`${address.url}${item.photo}`}
                  alt="gridimage"
                />
                {user === item.username && (
                  <svg
                    aria-label="delete image"
                    onClick={() => {
                      handleDeleteImg(item._id, item.username);
                      /*
                      console.log(
                        "index" +
                          images.findIndex((image) => image._id === item._id)
                      );
                      console.log("test1" + JSON.stringify(images));
                      setImages(
                        images.splice(
                          images.findIndex((image) => item.id === image._id)
                        ),
                        1
                      );
                      handleDeleteImg(item._id, item.username);

                      console.log("test2" + JSON.stringify(images));*/
                    }}
                    className="h-20 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                  </svg>
                )}
              </div>
            );
          })
        : currentGridData.map((item, index) => {
            return (
              <div
                key={index}
                className="col-span-12 lg:col-span-6 xl:col-span-4 overflow-hidden"
              >
                <img
                  className=""
                  src={`${address.url}${item.photo}`}
                  alt="gridimage"
                />
              </div>
            );
          })}
    </section>
  );
}

export default ImageGrid;
