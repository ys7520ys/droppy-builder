// lib/getFirebaseUrl.js
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";

export const getFirebaseMediaUrl = async (path, fallback = "") => {
  try {
    const fileRef = ref(storage, path);
    return await getDownloadURL(fileRef);
  } catch (err) {
    console.error("Firebase media fetch error:", err);
    return fallback;
  }
};
