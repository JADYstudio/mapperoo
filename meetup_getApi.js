// JavaScript Document
var APIKEY = "405727146c5e62374a697e641e27d";
var results = [];

function test(lat, lon){
	
var query = "https://api.meetup.com/2/open_events?callback=?&lat="+lat+"&lon="+lon+"&radius=smart&key="+APIKEY;

$.getJSON(query, function (data) {
		$.each(data.results, function (i, item) {
			results [i] = item; 
		});
    });	
	return results;
}