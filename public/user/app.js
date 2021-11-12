import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { URL, API_KEY, fetchData } from "../app.js";

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

const provider = new GoogleAuthProvider();

document.querySelector("#googleSignInButton").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    let username = user.displayName;
    document.querySelector("#username").innerHTML = username;

    const uid = user.uid;
    dispMovies(uid);

    // ...
  } else {
    // ...
  }
});

async function dispMovies(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let movies = docSnap.data().movies;
    console.log(movies);
    console.log(API_KEY);

    movies.forEach((movie) => {
      console.log(URL);
      fetchData(`${URL}movie/${movie}?api_key=${API_KEY}`, (jsonData) => {
        console.log(jsonData);
        document.querySelector("#movieList").innerHTML += `<li>${jsonData.title}</li>`;
      });
    });
  }
}
