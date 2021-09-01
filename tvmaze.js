"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const DEFAULT_IMAGE_URL = "https://tinyurl.com/tv-missing";
const BASE_SEARCH_URL = "http://api.tvmaze.com/search/shows";

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


async function getShowsByTerm(queryTerm) {//Note: See line 71 and pull out required array information here (i.e object destructuring)
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  // access TVMaze API
  // pass in search term into API get request
  // should return a JSON of results for search term

  let results = await getSearchAPIResults(queryTerm, BASE_SEARCH_URL);//Done: this contains more than shows (e.g. results)
  let shows = results.data;
  // console.log("shows", shows);
  // console.log("shows[0]", shows[0]);
  // console.log(shows)
  // console.log(shows[0])

  //loop over shows array
  //in each loop access show and set the variables for {id, name, summary, image}
  //return array of objects stripped down to the four items needed
  // let showsArray = []; //note: rename
  // for (let i = 0; i < shows.length; i++){
  //   // let id, name, summary
  //   // console.log(`shows[${i}]: `, shows[i].show);

  //   //initial variable assignment
  //   let {id, name, summary, image} = shows[i].show;
  //   image = image.medium;

  //   //check for null
  //   id = checkForNullInfo(id); //Note: this shouldn't be in the populating DOM section
  //   image = checkForNullImage(image);
  //   name = checkForNullInfo(name);
  //   summary = checkForNullInfo(summary);

  //   //populate array to be returned accordingly
  //   showsArray.push({id, name, summary, image});
  // }
  // console.log("showsArray: ", showsArray);

  let showsArray = shows.map((show)=> aPIManipulation(show)); //note: change name
  return showsArray;
}

function aPIManipulation(show) { //note: maybe change name
  let {id, name, summary, image} = show.show;

  //check for null
  id = checkForNullInfo(id); //Note: this shouldn't be in the populating DOM section
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

    // let id = checkForNullInfo(show.show.id); //Note: this shouldn't be in the populating DOM section
    // let image = checkForNullImage(show.show.image);
    // let name = checkForNullInfo(show.show.name);
    // let summary = checkForNullInfo(show.show.summary);


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
