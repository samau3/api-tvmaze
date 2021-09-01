"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const BASE_SEARCH_URL = "http://api.tvmaze.com/search/shows"

/**
 * Access TVMaze API with query term and a base URL
 * Returns promise of search result information in a JS object
 */

async function getTVMazeAPI(queryTerm, baseURL) {
  let apiResult = await axios.get(baseURL, { params: { q: queryTerm } });
  return apiResult;
}

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(queryTerm) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  // access TVMaze API
  // pass in search term into API get request
  // should return a JSON of results for search term

  let shows = await getTVMazeAPI(queryTerm, BASE_SEARCH_URL);
  shows = shows.data;
  // console.log("shows.data", shows.data)
  // console.log("shows.data[0]", shows.data[0])
  console.log(shows)
  console.log(shows[0])
  return shows;

  // return [
  //   {
  //     id: 1767,
  //     name: "The Bletchley Circle",
  //     summary:
  //       `<p><b>The Bletchley Circle</b> follows the journey of four ordinary 
  //          women with extraordinary skills that helped to end World War II.</p>
  //        <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their 
  //          normal lives, modestly setting aside the part they played in 
  //          producing crucial intelligence, which helped the Allies to victory 
  //          and shortened the war. When Susan discovers a hidden code behind an
  //          unsolved murder she is met by skepticism from the police. She 
  //          quickly realises she can only begin to crack the murders and bring
  //          the culprit to justice with her former friends.</p>`,
  //     image:
  //         "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
  //   }
  // ]
}

/**
 * Check if object key value exists
 * If not, replace with a string explaining absence
 */

function checkForNullInfo(showProperty) {
  if (!showProperty) {
    return "No Information"
  }
  return showProperty
}

function checkForNullImage(image) {
  if (!image) {
    return
  }
  return image.medium
}
/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {

    let id = checkForNullInfo(show.show.id);
    let image = checkForNullInfo(show.show.image);
    let name = checkForNullInfo(show.show.name);
    let summary = checkForNullInfo(show.show.summary);

    image = checkForNullImage(image)

    const $show = $(
      `<div data-show-id="${id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${image}" 
              alt="${name}" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${name}</h5>
             <div><small>${summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
