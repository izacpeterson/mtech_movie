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
const REC_MOVIE = `/movie/${params.id}/recommendations?api_key=${API_KEY}`;
let c1 = 0;
let c2 = 0;
function timer(len, count) {
  count += 1;
  if (count > len - 1) {
    count = 0;
  }
  return count;
}
function runtime_m(runtime) {
  const minutes = runtime % 60;
  return minutes;
}
function runtime_h(runtime) {
  const hours = runtime / 60;
  return Math.floor(hours);
}
fetchData(URL + REC_MOVIE, (jsonData) => {
  let reco = document.getElementById("rec");
  reco.innerHTML = "";
  jsonData.results.forEach((rec) => {
    reco.innerHTML += `<div id=${rec.id}>
                        <a href="index.html?id=${rec.id}">
                          <img class="movie-image"  src="https://image.tmdb.org/t/p/w500/${rec.poster_path}" alt="recomened"/>
                          <h3 class="name">${rec.title}</h3>
                        </a>
                      </div>`;
  });
});
fetchData(URL + MOVIE, (jsonData) => {
  document.getElementById("app-genre").innerHTML = "";
  let genres_names = [];
  let genres_ids = [];
  document.getElementById("title").innerText = jsonData.title;
  document.getElementById("movie-img").innerHTML = `<img  src="https://image.tmdb.org/t/p/w500/${jsonData.poster_path}" alt="${jsonData.title}"/>`;
  document.getElementById("details").innerText = jsonData.overview;
  document.getElementById("runtime-m").innerHTML = runtime_m(jsonData.runtime) + "m";
  document.getElementById("runtime-h").innerHTML = runtime_h(jsonData.runtime) + "h";
  document.getElementById("release").innerHTML = jsonData.release_date;
  for (let i = 0; i < jsonData.genres.length; i++) {
    genres_ids.push(jsonData.genres[i].id);
    genres_names.push(jsonData.genres[i].name);
  }
  document.getElementById("genre").innerText = `Genres: ${genres_names}`;
  for (let i = 0; i < genres_names.length; i++) {
    document.getElementById("app-genre").innerHTML += `<button class="genre" id="${genres_ids[i]}">${genres_names[i]}</button>`;
  }
  document.getElementById("app-overview").innerText = jsonData.overview;
});
fetchData(URL + MOVIE_AGE, (jsonData) => {
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
    document.getElementById("list-of-trailers").innerHTML = "";
    document.getElementById("list-app-trailer").innerHTML = "";
    for (let i = 0; i < jsonData.results.length; i++) {
      document.getElementById("list-of-trailers").innerHTML += `<div id="trail-num-${i}" class="trailer"><div class="circle"><img class="play" src="../img/playBtn.png"></div> <img id="web"  src="https://i.ytimg.com/vi/${jsonData.results[i].key}/hqdefault.jpg"></div>`;
      document.getElementById("list-app-trailer").innerHTML += `<div id="app-${i}" class="snap"><iframe width="411" height="315" title="trailer" id="video-${i}"
      src="https://www.youtube.com/embed/${jsonData.results[i].key}?controls=0">
      </iframe></div>`;
    }

    for (let i = 0; i < document.getElementsByClassName("circle").length; i++) {
      document.getElementsByClassName("circle")[i].addEventListener("click", () => {
        let mod = document.getElementById("modal");
        if (mod.classList.contains("hide-true")) {
          mod.classList.remove("hide-true");
          document.getElementById("list-of-trailers").classList.add("hide-true");
          document.getElementById("list-app-trailer").classList.add("hide-true");
        }

        document.getElementById("vid").innerHTML = `<iframe width="820" height="515" title="trailer" id="video"
      src="https://www.youtube.com/embed/${jsonData.results[i].key}?controls=0">
      </iframe>`;
      });
    }
    for (let i = 0; i < document.getElementsByClassName("circle-2").length; i++) {
      document.getElementsByClassName("circle-2")[i].addEventListener("click", () => {
        let mod = document.getElementById("modal");
        if (mod.classList.contains("hide-true")) {
          mod.classList.remove("hide-true");
          document.getElementById("list-of-trailers").classList.add("hide-true");
          document.getElementById("list-app-trailer").classList.add("hide-true");
        }

        document.getElementById("vid").innerHTML = `<iframe width="320" height="215" title="trailer" id="video"
        src="https://www.youtube.com/embed/${jsonData.results[i].key}?controls=0">
        </iframe>`;
      });
    }
  } else {
    document.getElementById("trailers").innerHTML = "";
  }
});
document.getElementById("savor").addEventListener("click", (test) => {
  saveMovie(params.id);
});

document.getElementById("close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hide-true");
  document.getElementById("list-app-trailer").classList.remove("hide-true");
  document.getElementById("list-of-trailers").classList.remove("hide-true");
});
