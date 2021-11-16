import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLC8jtwaCzmE_B2HiJ7NsaBQIQZ4J_1nE",
  authDomain: "mtech-movie.firebaseapp.com",
  projectId: "mtech-movie",
  storageBucket: "mtech-movie.appspot.com",
  messagingSenderId: "246636981233",
  appId: "1:246636981233:web:424cdc799e80177712b250",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

function saveMovie(movID) {
  console.log("saving movie");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      const newMov = doc(db, "users", uid);
      setDoc(newMov, { movies: arrayUnion(String(movID)) }, { merge: true });

      // ...
    } else {
      alert("you must be logged in to save a movie");
    }
  });
}

export { saveMovie };
