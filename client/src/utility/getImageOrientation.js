// Custom Hook for detecting the image orientation
// returns 1 for landscape and 2 for portrait orientation
//todo: reject?

const getImageOrientation = (image) => {
  return new Promise((resolve, reject) => {
    if (image.length !== 0) {
      const url = window.URL.createObjectURL(image[0]);
      const img = new Image();

      img.onload = function () {
        let imageOrientation = 1;
        if (img.height >= img.width) {
          imageOrientation = 2;
        }
        resolve(imageOrientation);
        URL.revokeObjectURL(img.src);
      };
      img.src = url;
    }
    reject(1);
  });
};

export default getImageOrientation;
