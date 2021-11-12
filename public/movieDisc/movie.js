import { fetchData } from "../app.js";
import { saveMovie } from "../save-movie.js";
let counter = 0;
const API_KEY = "26e99d56c670a23e5b53252a41402ce1";
const URL = "https://api.themoviedb.org/3/";
const TEST_ID = 580489;
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

console.log(params);
const MOVIE = `/movie/${params.id}?api_key=${API_KEY}`;
const TRAILER = `/movie/${params.id}/videos?api_key=${API_KEY}`;
const MOVIE_AGE = `/movie/${params.id}/release_dates?api_key=${API_KEY}`;
const REC_MOVIE =`/movie/${params.id}/recommendations?api_key=${API_KEY}`;
fetchData(URL + REC_MOVIE, (jsonData) =>{
  console.log(jsonData)
  let reco = document.getElementById('rec');
  reco.innerHTML = '';
  jsonData.results.forEach(rec =>{
    reco.innerHTML+=`<div id=${rec.id}>
                        <a href="index.html?id=${rec.id}">
                          <img class="movie-image"  src="https://image.tmdb.org/t/p/w500/${rec.poster_path}" alt="recomened"/>
                          <h3 class="name">${rec.title}</h3>
                        </a>
                      </div>`
  })
})
fetchData(URL + MOVIE, (jsonData) => {
  console.log(jsonData);
  let genres_names = [];
  let genres_ids = [];
  document.getElementById("title").innerText = jsonData.title;
  document.getElementById("movie-img").innerHTML = `<img  src="https://image.tmdb.org/t/p/w500/${jsonData.poster_path}" alt="${jsonData.title}"/>`;
  document.getElementById("details").innerText = jsonData.overview;
  for (let i = 0; i < jsonData.genres.length; i++) {
    genres_ids.push(jsonData.genres[i].id);
    genres_names.push(jsonData.genres[i].name);
  }
  document.getElementById("genre").innerText = `Genres: ${genres_names}`;
});
fetchData(URL + MOVIE_AGE, (jsonData) => {
  console.log(jsonData);
  jsonData.results.forEach((Element) => {
    if (Element.iso_3166_1 == "US") {
      Element.release_dates.forEach((age) => {
        if (age.certification != "") {
          document.getElementById("rate").innerText = age.certification;
        }
      });
    }
  });
});
fetchData(URL + TRAILER, (jsonData) => {
  console.log(jsonData);
  if (jsonData.results.length != 0) {
    document.getElementById("trailer").innerHTML = `<iframe width="420" height="315" title="trailer"
  src="https://www.youtube.com/embed/${jsonData.results[counter].key}">
  </iframe>`;
    let num1 = document.getElementById('curent-num');
    let num2 = document.getElementById('total');
    num2.innerText = jsonData.results.length;
    document.querySelector("#next").addEventListener("click", (next) => {
      counter += 1;
      if (counter > jsonData.results.length - 1) {
        counter = 0;
      }
      num1.innerText = counter+1;
      
      document.getElementById("trailer").innerHTML = `<iframe width="420" height="315"
    src="https://www.youtube.com/embed/${jsonData.results[counter].key}">
    </iframe>`;
    });
    document.querySelector("#previous").addEventListener("click", (back) => {
      counter -= 1;
      if (counter < 0) {
        counter = jsonData.results.length - 1;
      }
      num1.innerText = counter+1;
      
      document.getElementById("trailer").innerHTML = `<iframe width="420" height="315"
    src="https://www.youtube.com/embed/${jsonData.results[counter].key}">
    </iframe>`;
    });
  } else {
    document.getElementById("trailers").innerHTML = "";
  }
});
document.getElementById('savor').addEventListener('click', test =>{
  saveMovie(params.id)
})
