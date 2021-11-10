const API_KEY = "26e99d56c670a23e5b53252a41402ce1";
const URL = "https://api.themoviedb.org/3/";

//API search endpoint
const SEARCH = `search/movie/?api_key=${API_KEY}&query=`;
const POPULAR = `movie/popular?api_key=${API_KEY}`;

async function fetchData(url, callback) {
  let rawData = await fetch(url);
  let jsonData = await rawData.json();

  callback(jsonData);
}

export { fetchData, API_KEY, URL };
