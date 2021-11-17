document.cookie = "cookie1=value1; SameSite=Lax";
import { fetchData, URL, API_KEY } from "../app.js";
import { saveMovie } from "../save-movie.js";
import { saveComment, getComments } from "../comments.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const TEST_ID = 580489;
const ID = params.id;

const MOVIE = `/movie/${ID}?api_key=${API_KEY}`;
const TRAILER = `/movie/${ID}/videos?api_key=${API_KEY}`;
const MOVIE_AGE = `/movie/${ID}/release_dates?api_key=${API_KEY}`;
const REC_MOVIE = `/movie/${ID}/recommendations?api_key=${API_KEY}`;

//Movie Info
fetchData(URL + MOVIE, (data) => {
  console.log(data);
  document.querySelector("#title").innerHTML = data.title;
  document.querySelector("#release").innerHTML = data.release_date;
  document.querySelector("#release").innerHTML = data.release_date;
  document.querySelector("#length").innerHTML = `${data.runtime} mins`;
  document.querySelector("#poster").src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  // document.querySelector("#banner").src = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
  document.querySelector("#description").innerHTML = data.overview;
});

//Trailers
fetchData(URL + TRAILER, (data) => {
  console.log(data);
  let YOUTUBE = "https://www.youtube.com/embed/";
  YOUTUBE += data.results[0].key + "?playlist=";

  data.results.forEach((trailer) => {
    if (trailer.type === "Trailer") {
      //   document.querySelector("#trailers").innerHTML += `<iframe src="${YOUTUBE + trailer.key}" frameborder="0"></iframe>`;
      YOUTUBE += "," + trailer.key;
    }
  });

  document.querySelector("#trailers").innerHTML += `<iframe src="${YOUTUBE}" frameborder="0"></iframe>`;
});

document.querySelector("#addComment").addEventListener("click", (event) => {
  event.preventDefault();
  saveComment(document.querySelector("#commentText").value, params.id);
  getComments(params.id, renderComments);
});

getComments(params.id, renderComments);

function renderComments(data) {
  document.querySelector("#commentList").innerHTML = "";
  console.log(data);
  data.comments.forEach((comment) => {
    document.querySelector("#commentList").innerHTML += `<li class="comment">${comment}</li>`;
  });
}
