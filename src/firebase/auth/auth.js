import firebase_app from "../config";
import { getStorage } from "firebase/storage";

export const storage = getStorage(firebase_app);
