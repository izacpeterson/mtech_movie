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
const CREDITS = `/movie/${ID}/credits?api_key=${API_KEY}`;
const SIMILAR = `/movie/${ID}/similar?api_key=${API_KEY}`;

//Movie Info
fetchData(URL + MOVIE, (data) => {
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
  if (data.comments) {
    data.comments.forEach((comment) => {
      document.querySelector("#commentList").innerHTML += `<li class="comment">${comment}</li>`;
    });
  }
}

fetchData(URL + CREDITS, (data) => {
  let castList = document.querySelector("#castList");

  data.cast.forEach((castMember) => {
    castList.innerHTML += `
  <li class="castMember">
    <img class="castImg" src="https://image.tmdb.org/t/p/w500/${castMember.profile_path}" />
    <h2>${castMember.name}</h2>
    <h3>${castMember.character}</h3>
  </li>
  `;
  });
});

fetchData(URL + SIMILAR, (data) => {
  data.results.forEach((movie) => {
    console.log(movie);
    document.querySelector("#recommend").innerHTML += `
      <li class="movie">
        <a href="./movie/?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title}-poster"/>
        </a>
        <div class="movieData">
          <a href="?id=${movie.id}">
            <h2>${movie.title}</h2>
          </a>
          <h3>Release Date: ${movie.release_date}</h3>
          <h3>Rating: ${movie.vote_average}/10</h3>
          <!-- <span class="movieDescription">${movie.overview}</span> -->
          <span class='movieBtnList'>
            <button class="material-icons movieBtn icon-Btn" onclick="
              navigator.share({
                title: 'DevFlix: ${movie.title}',
                url: './movie/?id=${movie.id}'
              })">share
            </button>
            <button id="${movie.id}" class="material-icons movieBtn addMov icon-Btn">playlist_add</button>
          </span>
        </div>
      </li>`;
  });
});
document.getElementById("addMovie").addEventListener("click", () => {
  saveMovie(ID);
});
