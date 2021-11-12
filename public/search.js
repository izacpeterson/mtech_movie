import { fetchData, URL, API_KEY } from "./app.js";

//API search endpoint
const SEARCH = `search/movie?api_key=${API_KEY}&query=`;

//API popular movies endpoint
const POPULAR = `movie/popular?api_key=${API_KEY}`;

//populates search list with current popular movies
fetchData(URL + POPULAR, populateList);

//search event listener
document.querySelector("#searchBtn").addEventListener("click", (event) => {
  event.preventDefault();

  let query = document.querySelector("#queryText").value;

  //fetches data from API, sends to populateList function as callback
  fetchData(URL + SEARCH + query, populateList);
});

//callback funciton to process fetched data
function populateList(jsonData) {
  let searchList = document.querySelector("#searchResult");
  searchList.innerHTML = "";

  //populates DOM with search results. Content enclosed in an A tag, to reference/send movie ID to movie detail page
  jsonData.results.forEach((movie) => {
    searchList.innerHTML += `
      <li class="movie">
        <a href="movieDisc/index.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title}-poster"/>
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
