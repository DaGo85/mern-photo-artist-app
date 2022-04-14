import { motion, AnimatePresence } from "framer-motion";
import { useModalContext } from "../../../utility/ImageModalWrapper";

function ImageGrid({
  currentGridData,
  address,
  handleDeleteImg,
  deleteMode,
  images,
}) {
  const { setIsOpen, setImageData } = useModalContext();
  const user = "da";

  return (
    <section className="card-setup image-grid py-6 justify-center ">
      {deleteMode
        ? currentGridData.map((item) => {
            return (
              <div
                key={item.photo}
                className="h-full w-full col-span-12 lg:col-span-6 xl:col-span-4 relative "
              >
                <div className="w-full h-full block overflow-hidden aspect-square ">
                  {item.orientation === 1 ? (
                    <img
                      className="w-full h-full hover:animate-sliderImage object-cover aspect-square"
                      src={`${address.url}${item.photo}`}
                      alt="landscape grid item"
                    />
                  ) : (
                    <img
                      className="w-full h-full hover:animate-sliderImage object-cover aspect-square"
                      src={`${address.url}${item.photo}`}
                      alt="portrait grid item"
                    />
                  )}
                </div>
                {user === item.username && (
                  <div className="w-full h-full absolute top-0 left-0 items-center justify-center flex bg-slate-900/70">
                    <svg
                      aria-label="delete image"
                      onClick={() => {
                        handleDeleteImg(item._id, item.username);
                      }}
                      className="cursor-pointer h-1/3 opacity-70 fill-slate-100 hover:opacity-100 hover:fill-red-400 transition-color duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })
        : currentGridData.map((item) => {
            return (
              <AnimatePresence>
                <div
                  onClick={() => {
                    setImageData({
                      images: images,
                      currentimage: item,
                      path: address,
                    });
                    setIsOpen(true);
                  }}
                  key={item.photo}
                  className="h-full w-full col-span-12 lg:col-span-6 xl:col-span-4 relative"
                >
                  <div className="w-full h-full block overflow-hidden aspect-square">
                    {item.orientation === 1 ? (
                      <motion.img
                        className="w-full h-full hover:animate-sliderImage object-cover aspect-square"
                        src={`${address.url}${item.photo}`}
                        alt="landscape grid item"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 50 }}
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    ) : (
                      <motion.img
                        className="w-full h-full hover:animate-sliderImage object-cover aspect-square"
                        src={`${address.url}${item.photo}`}
                        alt="portrait grid item"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 50 }}
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    )}
                  </div>
                </div>
              </AnimatePresence>
            );
          })}
    </section>
  );
}

export default ImageGrid;
