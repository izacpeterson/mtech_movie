import { fetchData, URL, API_KEY } from "./app.js";

//API search endpoint
const SEARCH = `search/movie/?api_key=${API_KEY}&query=`;
const POPULAR = `movie/popular?api_key=${API_KEY}`;

//Search for movie
// fetchData(URL + SEARCH + "Dune", (jsonData) => {
//   console.log(jsonData);
// });
fetchData(URL + POPULAR, populateList);

document.querySelector("#searchBtn").addEventListener("click", (event) => {
  event.preventDefault();

  let query = document.querySelector("#queryText").value;
  console.log(query);

  fetchData(URL + SEARCH + query, populateList);
});

function populateList(jsonData) {
  console.log(jsonData);
  let searchList = document.querySelector("#searchResult");
  searchList.innerHTML = "";

  jsonData.results.forEach((movie) => {
    searchList.innerHTML += `
      <li class="movie">
        <a href="movieDisc/index.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>
            <div class="movieData">
                <h2>${movie.title}</h2>
                <h3>Release Date: ${movie.release_date}</h3>
                <h3>Rating: ${movie.vote_average}/10</h3>
                <!-- <span class="movieDescription">${movie.overview}</span> -->
            </div>
        </a>
      </li>`;
  });
}
