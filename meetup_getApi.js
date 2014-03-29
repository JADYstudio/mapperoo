// JavaScript Document
var APIKEY = "26157830757d475e4b557d7e5d725b35";

function test(lat, lon, back_fn){
	
var query = "https://api.meetup.com/2/open_events?callback=?&lat="+lat+"&lon="+lon+"&radius=smart&key="+APIKEY;

var results = [];

$.getJSON(query, function (data) {
		$.each(data.results, function (i, item) {
			results [i] = item; 
		});
		back_fn(results);
    });	
}