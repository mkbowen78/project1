$(document).ready(function() {
	function sha256(stringToSign, secretKey) {
	  var hex = CryptoJS.HmacSHA256(stringToSign, secretKey);
	  return hex.toString(CryptoJS.enc.Base64);
	} 

	function getAmazonItemSearch(keyword, category) {
		var PrivateKey = "55uIMEFutrAh1YUj+5Peah+5mlK6QL1a5XbKrTaQ";
		var PublicKey = "AKIAJT7OL5NR6LS2A66A";
		var AssociateTag = "fdmoon-20";

		var parameters = [];
		parameters.push("AWSAccessKeyId=" + PublicKey);

		parameters.push("Keywords=" + encodeURI(keyword));
		parameters.push("SearchIndex=" + category);

		parameters.push("Operation=ItemSearch");
		parameters.push("Service=AWSECommerceService");
		parameters.push("Timestamp=" + encodeURIComponent(moment().format()));

		parameters.push("AssociateTag=" + AssociateTag);

		parameters.sort();
		var paramString = parameters.join('&');

		var signingKey = "GET\n" + "webservices.amazon.com\n" + "/onca/xml\n" + paramString;

		var signature = sha256(signingKey,PrivateKey);
		    signature = encodeURIComponent(signature);

		var amazonUrl =  "http://webservices.amazon.com/onca/xml?" + paramString + "&Signature=" + signature;

		return amazonUrl;
	}


	function convertXml2JSon(xml) {
		var x2js = new X2JS();
	    var json = JSON.parse(JSON.stringify(x2js.xml_str2json(xml)));
	    return json;
	}

	$("#select-search").on("click", function(event) {
		// prevent form from submitting
		event.preventDefault();

		// Retrieve data
		var key = $("#data-keyword").val().trim();
		var cat = $("#data-category").val().trim();

// The value you specified for SearchIndex is invalid. Valid values include [ 'All','Wine','Wireless','ArtsAndCrafts','Miscellaneous','Electronics','Jewelry','MobileApps','Photo','Shoes','KindleStore','Automotive','Vehicles','Pantry','MusicalInstruments','DigitalMusic','GiftCards','FashionBaby','FashionGirls','GourmetFood','HomeGarden','MusicTracks','UnboxVideo','FashionWomen','VideoGames','FashionMen','Kitchen','Video','Software','Beauty','Grocery',,'FashionBoys','Industrial','PetSupplies','OfficeProducts','Magazines','Watches','Luggage','OutdoorLiving','Toys','SportingGoods','PCHardware','Movies','Books','Collectibles','Handmade','VHS','MP3Downloads','Fashion','Tools','Baby','Apparel','Marketplace','DVD','Appliances','Music','LawnAndGarden','WirelessAccessories','Blended','HealthPersonalCare','Classical' ]		

		var queryURL = getAmazonItemSearch(key, cat);
		console.log(queryURL);

		// ItemLookup

		$.ajax({
			url: queryURL,
			method: "GET",
			// dataType: 'jsonp'
		}).done(function(resp) {

			var response = convertXml2JSon(resp);
			console.log(typeof response);
			console.log(response);
		});


// // Create the XHR object.
// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // XHR for Chrome/Firefox/Opera/Safari.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // XDomainRequest for IE.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     // CORS not supported.
//     xhr = null;
//   }
//   return xhr;
// }

// // Helper method to parse the title tag from the response.
// function getTitle(text) {
//   return text.match('<title>(.*)?</title>')[1];
// }

// // Make the actual CORS request.
// function makeCorsRequest() {
//   // This is a sample server that supports CORS.
//   // var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

//   var xhr = createCORSRequest('GET', queryURL);
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   }

//   // Response handlers.
//   xhr.onload = function() {
//     var text = xhr.responseText;
//     var title = getTitle(text);
//     alert('Response from CORS request to ' + url + ': ' + title);
//   };

//   xhr.onerror = function() {
//     alert('Woops, there was an error making the request.');
//   };

//   xhr.send();
// }

// makeCorsRequest();

		// Clear each field
		// $("#data-keyword").val("");
		// $("#data-category").val("");
	});
});
