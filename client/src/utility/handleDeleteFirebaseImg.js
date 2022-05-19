import { ref } from "firebase/storage";
import { firebaseBaseUrl } from "../assets/data";
import { projectStorage } from "./firebase";

const handleDeleteImg = async (imageid, username, url) => {
  const firebaseImageId = url
    .split(firebaseBaseUrl)[1]
    .split("F")[1]
    .split("?")[0];

  // Create a reference to the file to delete
  const deleteRef = ref(projectStorage, "gallery");

  const imageRef = ref(deleteRef, firebaseImageId);

  // Delete the file
  deleteObject(imageRef)
    .then(() => {
      setRerenderComponent(!rerenderComponent);
      setIsError(false);
    })
    .catch((error) => {
      setIsError(
        "Das Bild konnte nicht gelöscht werden. Versuche es später noch einmal!"
      );
    });
};
