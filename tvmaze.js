"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const DEFAULT_IMAGE_URL = "https://tinyurl.com/tv-missing";
const BASE_SEARCH_URL = "http://api.tvmaze.com/search/shows";//Note: cut this base url so it is actualy the base and can be reused accross multiple api requests

/**
 * 
 * Given query term and api URL, return promise of search results from api get request.
 */

async function getSearchAPIResults(queryTerm, baseURL) { 
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

  let results = await getSearchAPIResults(queryTerm, BASE_SEARCH_URL);//Done: this contains more than shows (e.g. results)
  let rawShowsData = results.data;

  let shows = rawShowsData.map((rawShowData)=> showDataExtraction(rawShowData)); 
  return shows;
}

/**Takes in raw show data recieved from the tv maze API. 
 * Returns stripped down object of id, image, name, and summary. */
function showDataExtraction(rawShowData) { 
  let {id, name, summary, image} = rawShowData.show;

  //check for null
  id = checkForNullInfo(id); 
  image = checkForNullImage(image);
  name = checkForNullInfo(name);
  summary = checkForNullInfo(summary);
  

  return {id, name, summary, image};
}

/**
 * Check if object key value exists
 * If it does, return the value.
 * If not, return the string "No Information"
 */

function checkForNullInfo(showProperty) {//Done: try a ternery instead
  // if (!showProperty) {
  //   return "No Information"
  // }
  // return showProperty

  return(showProperty ? showProperty : "No Information");
}

/**
 * Check image exist.
 * If yes, return the image URL.
 * If not, return placeholder image.
 */

function checkForNullImage(image) { //Done: try a ternery instead
  // if (!image) {
  //   return DEFAULT_IMAGE_URL; //Done: make this a global constant
  // }
  // return image.medium
  return image ? image.medium : DEFAULT_IMAGE_URL;
}
/** Given list of shows, create markup for each and add to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {

    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${show.image}" 
              alt="${show.name}" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
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
