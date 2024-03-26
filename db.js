// const firebase = require("firebase/compat/app");
// Required for side-effects
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAGWRub6SD_WmnGydyL8bESiecJQemO1bE",
  authDomain: "telegram-bot-aa36c.firebaseapp.com",
  projectId: "telegram-bot-aa36c",
  storageBucket: "telegram-bot-aa36c.appspot.com",
  messagingSenderId: "1080992275964",
  appId: "1:1080992275964:web:9977cf1300670c4718e679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const tryDb = async () => {
  // try {
  //   const docRef = await addDoc(collection(db, "users"), {
  //     first: "Ada",
  //     last: "Lovelace",
  //     born: 1815,
  //   });
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
};

const deleteDocument = async (docId) => {
  try {
    await deleteDoc(doc(db, "users", docId));
    console.log("Document deleted with ID:", docId);
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};

deleteDocument("r5cDbTjxmdTImWmISl9K");
tryDb();
