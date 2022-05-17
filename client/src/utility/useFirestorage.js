import { useState, useEffect } from "react";
import { projectStorage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(projectStorage, file.name);

    uploadBytes(storageRef, file).then(
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();

        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
