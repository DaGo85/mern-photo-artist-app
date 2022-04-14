import axios from "axios";
import { useEffect, useState } from "react";
import { address, apiroutes } from "../../../assets/data";
import { useModalContext } from "../../../utility/ImageModalWrapper";
import OrientedImage from "../OrientedImage";

function RandomImage() {
  const [images, setImages] = useState([]);
  const { setIsOpen, setImageData } = useModalContext();
  const PF = address[0].url;

  // Fetching images from gallery route
  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`${apiroutes[0].url}/photos`);
      const rndimg = [res.data[Math.floor(Math.random() * res.data.length)]];
      setImages(rndimg);
    };
    fetchImages();
  }, []);

  console.log("images" + JSON.stringify(images));

  return (
    <div className="card-setup py-form">
      {images.length > 0 && (
        <div
          onClick={() => {
            setImageData({
              images: images,
              currentimage: images[0],
              path: address[0],
            });
            setIsOpen(true);
          }}
        >
          <OrientedImage
            image={images[0].photo}
            path={PF}
            orientation={images[0].orientation}
            alt="random from gallery"
          />
        </div>
      )}
    </div>
  );
}

export default RandomImage;
