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

function saveComment(comment, movieID) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const newMov = doc(db, "movies", String(movieID));
      setDoc(newMov, { comments: arrayUnion(comment) }, { merge: true });
    } else {
      alert("you must be logged in to save a movie");
    }
  });
}
async function getComments(movieID, callback) {
  const docRef = doc(db, "movies", String(movieID));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let comments = docSnap.data();
    callback(comments);
  }
}

export { saveComment, getComments };
