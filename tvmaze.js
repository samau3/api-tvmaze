"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const BASE_SEARCH_URL = "http://api.tvmaze.com/search/shows";

/**
 * Access TVMaze API with query term and a base URL
 * Returns promise of search result information in a JS object
 */
//Given query term and api URL, return results of api get request at the 
//Note: stronger doc string
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


async function getShowsByTerm(queryTerm) {//Note: See line 71 and pull out required array information here (i.e object destructuring)
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  // access TVMaze API
  // pass in search term into API get request
  // should return a JSON of results for search term

  let shows = await getTVMazeAPI(queryTerm, BASE_SEARCH_URL);//Note: this contains more than shows (e.g. results)
  shows = shows.data;
  // console.log("shows.data", shows.data)
  // console.log("shows.data[0]", shows.data[0])
  console.log(shows)
  console.log(shows[0])
  return shows;
}

/**
 * Check if object key value exists
 * If it does, return the value.
 * If not, return the string "No Information"
 */

function checkForNullInfo(showProperty) {//Note: try a ternery instead
  if (!showProperty) {
    return "No Information"
  }
  return showProperty
}

/**
 * Check image exist.
 * If yes, return the image URL.
 * If not, return placeholder image.
 */

function checkForNullImage(image) { //Note: try a ternery instead
  if (!image) {
    return "https://tinyurl.com/tv-missing"; //Note: make this a global constant
  }
  return image.medium
}
/** Given list of shows, create markup for each and add to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {

    let id = checkForNullInfo(show.show.id); //Note: this shouldn't be in the populating DOM section
    let image = checkForNullImage(show.show.image);
    let name = checkForNullInfo(show.show.name);
    let summary = checkForNullInfo(show.show.summary);


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
