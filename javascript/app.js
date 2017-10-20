var apiKey = "2e5bc66f2572e9f8f5a2444ecc8bc806";

var query;
var lat = 30.2672;
var lng = 97.7431;

var queryURL;


$(document).ready(function() {

  function runQuery(queryURL) {
    queryURL = "https://api.goodzer.com/products/v0.1/search_stores/?query=" + query + "&lat=" + lat + "&lng=-" + lng + "&radius=5&priceRange=30:120&apiKey=" + apiKey;
    console.log(queryURL);
    console.log("running");
    //heroku workaround for Cors
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

	$.get(queryURL,
	  function (goodzerData) {
	    console.log(goodzerData);
      // Logging the URL so we have access to it for troubleshooting
      console.log("------------------------------------");
      console.log("URL: " + queryURL);
      console.log("------------------------------------");

      // Log the goodzer to console, where it will show up as an object
      console.log(goodzerData);
      console.log("------------------------------------");
	});

    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called: "goodzerData"

    // $.ajax({
    //   url: queryURL,
    //   method: "GET",
    //   dataType: "jsonp",
    //   crossOrigin: true
    // }).done(function(goodzerData) {
    //
    //   // Logging the URL so we have access to it for troubleshooting
    //   console.log("------------------------------------");
    //   console.log("URL: " + queryURL);
    //   console.log("------------------------------------");
    //
    //   // Log the goodzer to console, where it will show up as an object
    //   console.log(goodzerData);
    //   console.log("------------------------------------");
    //
    // });
  }
  //
  $("#select-search").on("click", function(event) {
    // prevents page from reloading
    event.preventDefault();
    // clears the results field to prepare for new result
    // $("#display-search").empty();
    // // Grabbing text the user typed into the search input
    query = $("#data-keyword").val().trim();
    console.log("query is: " +  query);
    // var searchURL = queryURL + searchTerm;
    runQuery(queryURL);

  });
});
