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

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(doc);
// });

// await setDoc(doc(db, "users", "izac"), {
//   user: "izacpeterson@gmail.com",
//   movies: ["test", "test2", "test3"],
// });

// const ME = doc(db, "users", "izac");
// console.log(ME);

// const SNAP = await getDoc(ME);

// console.log(SNAP.data());

function saveMovie(movID) {
  console.log("saving movie");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);

      const uid = user.uid;

      const newMov = doc(db, "users", uid);
      setDoc(newMov, { movies: arrayUnion(movID) }, { merge: true });

      console.log("Movie Saved to Firebase");

      // ...
    } else {
      alert("you must be logged in to save a movie");
    }
  });
}

// saveMovie("Avatar");

export { saveMovie };
