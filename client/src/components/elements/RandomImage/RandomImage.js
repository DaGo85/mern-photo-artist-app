// Generates random image for Home and Impressum

import BasicImage from "../BasicImage/BasicImage";

import { apiroutes } from "../../../assets/data";
import { useModalContext } from "../../../utility/ImageModalWrapper";

import axios from "axios";
import { useEffect, useState } from "react";

function RandomImage() {
  const [images, setImages] = useState([]);
  const { setIsOpen, setImageData } = useModalContext();

  // Fetching images from gallery route
  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`${apiroutes[0].url}/photos`);
      const rndimg = [res.data[Math.floor(Math.random() * res.data.length)]];
      setImages(rndimg);
    };
    fetchImages();
  }, []);

  return (
    <div className="card-setup py-form">
      {images.length > 0 && (
        <div
          onClick={() => {
            setImageData({
              images: images,
              currentimage: images[0],
            });
            setIsOpen(true);
          }}
        >
          <BasicImage
            image={images[0]?.photo}
            alt="Zufälliges Bild aus der Gallerie"
          />
        </div>
      )}
    </div>
  );
}

export default RandomImage;
