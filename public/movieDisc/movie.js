import { fetchData } from "../app.js";

const API_KEY = "26e99d56c670a23e5b53252a41402ce1";
const URL = "https://api.themoviedb.org/3/";
const TEST_ID = 580489;
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params);
const MOVIE = `/movie/${params.id}?api_key=${API_KEY}`;
const TRAILER = `/movie/${params.id}/videos?api_key=${API_KEY}`;

fetchData(URL + MOVIE, (jsonData) => {
  console.log(jsonData);
  document.getElementById("title").innerText = jsonData.title;
  document.getElementById("movie-img").innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${jsonData.poster_path}"/>`;
  document.getElementById("details").innerText = jsonData.overview;
});
fetchData(URL + TRAILER, (jsonData) => {
  console.log(jsonData);
  document.getElementById("trailers").innerText = jsonData;
});
