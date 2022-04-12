import axios from "axios";
import { useEffect, useState } from "react";
import { address, apiroutes } from "../../../assets/data";
import OrientedImage from "../OrientedImage";

function RandomImage() {
  const [images, setImages] = useState([]);
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
        <>
          <OrientedImage
            image={images[0].photo}
            path={PF}
            orientation={images[0].orientation}
            alt="random from gallery"
          />
        </>
      )}
    </div>
  );
}

export default RandomImage;
