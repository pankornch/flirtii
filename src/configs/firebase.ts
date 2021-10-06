import { getStorage } from "firebase/storage"
import { initializeApp } from "firebase/app"
import { FIREBASE_CONFIG } from "./env"

const firebaseApp = initializeApp(FIREBASE_CONFIG)

const storage = getStorage(firebaseApp)

export { storage, firebaseApp }