import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc, deleteDoc, updateDoc, deleteField, arrayRemove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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

    document.querySelector("#googleSignInButton").style.display = "none";

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
      fetchData(`${URL}movie/${movie}?api_key=${API_KEY}`, (jsonData) => {
        document.querySelector("#movieList").innerHTML += `
        <li class="movie" id="movie-${jsonData.id}">
          <a href="../movieDisc/index.html?id=${jsonData.id}">  
            <img src="https://image.tmdb.org/t/p/w200/${jsonData.poster_path}" alt="${jsonData.title}-poster"/>
          </a>
            <div class="movieData">
              <a href="../movieDisc/index.html?id=${jsonData.id}">  
                <h2>${jsonData.title}</h2>
              </a>
              <h3>Release Date: ${jsonData.release_date}</h3>
              <h3>Rating: ${jsonData.vote_average}/10</h3>
              <span class='movieBtnList'>
                <button class="material-icons movieBtn icon-Btn" onclick="
                  navigator.share({
                  title: 'DevFlix: ${jsonData.title}',
                  url: '../movieDisc/index.html?id=${jsonData.id}'
                  })">share
                </button>
                <button id="${jsonData.id}" class="material-icons movieBtn removeBtn icon-Btn" >playlist_remove</button>
          </span>
            </div>
        </li>`;
      });
    });
  }
}

document.querySelector("#movieList").addEventListener("click", (e) => {
  if (e.target.classList[2] == "removeBtn") {
    removeMove(e.target.id);
  }
});

async function removeMove(id) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let username = user.displayName;
      document.querySelector("#username").innerHTML = username;

      const uid = user.uid;

      const movieRef = doc(db, "users", uid);

      updateDoc(movieRef, {
        movies: arrayRemove(id),
      });

      let el = document.getElementById("movie-" + id);
      el.remove();

      // ...
    } else {
      // ...
    }
  });
}
