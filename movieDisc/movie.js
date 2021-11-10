import { fetchData } from "../app.js";

const API_KEY = "26e99d56c670a23e5b53252a41402ce1";
const URL = "https://api.themoviedb.org/3/";
const TEST_ID = 580489;
const MOVIE = `/movie/${TEST_ID}?api_key=${API_KEY}`;
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
fetchData(URL + MOVIE, (jsonData) => {
  console.log(jsonData);
  document.getElementById("title").innerText = jsonData.title;
  document.getElementById("movie-img").innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${jsonData.poster_path}"/>`;
  document.getElementById("details").innerText = jsonData.overview;
});
