// JavaScript Document
var APIKEY = "405727146c5e62374a697e641e27d";

function test(lat, lon){
	
var query = "https://api.meetup.com/2/open_events?callback=?&lat="+lat+"&lon="+lon+"&radius=smart&key=405727146c5e62374a697e641e27d";
//"https://www.api.meetup.com/2/open_events?callback=?&lon=" + long + "&lat=" + lat + "&radius=smart&key=" + APIKEY;
 //https://api.meetup.com/2/open_events?callback=?&country=CA&city=Waterloo&page=5&key=405727146c5e62374a697e641e27d

	var results = [];
	
$.getJSON(query, function (data) {
		$.each(data.results, function (i, item) {
			
			results [i] = item; 
		});
    });	
	return results;
}

//"https://api.meetup.com/2/open_events?callback=?&country=CA&city=Waterloo&page=5&key=405727146c5e62374a697e641e27d"