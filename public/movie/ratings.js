import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc, arrayUnion, arrayRemove, updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { saveMovie } from "../save-movie.js";

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

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

document.getElementById("star1").addEventListener("click", () => {
  document.getElementById("star1").innerText = "star_rate";
  document.getElementById("star2").innerText = "star_border";
  document.getElementById("star3").innerText = "star_border";
  document.getElementById("star4").innerText = "star_border";
  document.getElementById("star5").innerText = "star_border";

  rateMovie(1, params.id);
});
document.getElementById("star2").addEventListener("click", () => {
  document.getElementById("star1").innerText = "star_rate";
  document.getElementById("star2").innerText = "star_rate";
  document.getElementById("star3").innerText = "star_border";
  document.getElementById("star4").innerText = "star_border";
  document.getElementById("star5").innerText = "star_border";

  rateMovie(2, params.id);
});
document.getElementById("star3").addEventListener("click", () => {
  document.getElementById("star1").innerText = "star_rate";
  document.getElementById("star2").innerText = "star_rate";
  document.getElementById("star3").innerText = "star_rate";
  document.getElementById("star4").innerText = "star_border";
  document.getElementById("star5").innerText = "star_border";

  rateMovie(3, params.id);
});
document.getElementById("star4").addEventListener("click", () => {
  document.getElementById("star1").innerText = "star_rate";
  document.getElementById("star2").innerText = "star_rate";
  document.getElementById("star3").innerText = "star_rate";
  document.getElementById("star4").innerText = "star_rate";
  document.getElementById("star5").innerText = "star_border";

  rateMovie(4, params.id);
});
document.getElementById("star5").addEventListener("click", () => {
  document.getElementById("star1").innerText = "star_rate";
  document.getElementById("star2").innerText = "star_rate";
  document.getElementById("star3").innerText = "star_rate";
  document.getElementById("star4").innerText = "star_rate";
  document.getElementById("star5").innerText = "star_rate";

  rateMovie(5, params.id);
});

async function rateMovie(rating, movieID) {
  saveMovie(movieID);

  const docRef = doc(db, "movies", movieID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (docSnap.data().ratings) {
      let ratings = docSnap.data().ratings;
      ratings.push(rating);

      await updateDoc(docRef, { ratings: ratings });
    }
  } else {
    console.log("no data found");
    let ratings = [rating];
    await setDoc(docRef, { ratings: ratings });
  }

  getRatings(params.id);
}

async function getRatings(ID) {
  const docRef = doc(db, "movies", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    document.querySelector("#averageRating").innerHTML = "";

    let sum = 0;
    docSnap.data().ratings.forEach((rate) => {
      sum += rate;
    });

    let average = sum / docSnap.data().ratings.length;

    document.querySelector("#averageRating").innerHTML = `${average.toFixed(1)}/5`;
  }
}

getRatings(params.id);
