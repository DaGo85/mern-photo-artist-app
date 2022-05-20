// function for deleting images from Firebase storage

import { deleteObject, ref } from "firebase/storage";
import { firebaseBaseUrl } from "../assets/data";
import { projectStorage } from "./firebase";

const handleDeleteFirebaseImg = async (
  url,
  folder,
  setRerenderComponent,
  setIsError
) => {
  const firebaseImageId = url
    .split(firebaseBaseUrl)[1]
    .split("F")[1]
    .split("?")[0];

  // Create a reference to the file to delete
  const deleteRef = ref(projectStorage, folder);

  const imageRef = ref(deleteRef, firebaseImageId);

  // Delete the file
  deleteObject(imageRef)
    .then(() => {
      if (!setRerenderComponent) return;
      setRerenderComponent((prevRender) => !prevRender);

      if (!setIsError) return;
      setIsError(false);
    })
    .catch((error) => {
      if (!setIsError) return;
      setIsError(
        "Das Bild konnte nicht gelöscht werden. Versuche es später noch einmal!"
      );
    });
};

export default handleDeleteFirebaseImg;
