import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDicme-wQh8D0Gdh-EaypEh4yXr2pUR4W8",
  authDomain: "mobileappdev-1ef40.firebaseapp.com",
  projectId: "mobileappdev-1ef40",
  storageBucket: "mobileappdev-1ef40.firebasestorage.app",
  messagingSenderId: "276934337316",
  appId: "1:276934337316:web:1f46b87bf0fefeaaf709b1",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
export { db }; 