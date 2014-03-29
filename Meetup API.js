// JavaScript Document

const APIKEY = '405727146c5e62374a697e641e27d';

var test = null;
var url = "https://www.api.meetup.com/2/open_events.json?callback=?&lat=15&lon=15&key=405727146c5e62374a697e641e27d";


/*$(document).ready(function(){
    $.getJSON("https://api.meetup.com/2/groups?callback=?&sign=true&member_id=8377069&page=20&api&key=405727146c5e62374a697e641e27d&only=name,link", 
function (data) {
    var htmlString = "";
    $.each(data.results, function (i, item) {
        htmlString += '<h3><a href="' + item.link + '" target="_blank">' + item.name + '</a></h3>';
    });
	console.log(htmlString);	
    $('#groups').html(htmlString);});
});*/

/*$(document).ready(function() {
    $.getJSON(url, 
function(data){
	var temp = "";
	$.each(data.results, function(i, item){
		temp += item.name + " ";
	});
	
	console.log(temp);
	derp(temp);
	})
	
	var test1 = new Array();
	
	test1 = area_map(-80.536161, 43.472371);
	
	console.log(test1);
});*/

function area_map_wrap(long, lat){
	area_map(long, lat, function(arr){
		return arr;
	});
}


function area_map (long, lat/*, fn*/){
	var build_query = "https://www.api.meetup.com/2/open_events.json?callback=?&lon=" + long + "&lat=" + lat + "&radius=10&key=" + APIKEY;
	
	var to_return = new Array();
	
	
	$.getJSON(build_query, function(data){
			$.each(data.results, function(i, item){
				to_return[i] = item;
			});
			console.log(to_return);
		});
	return to_return;
}