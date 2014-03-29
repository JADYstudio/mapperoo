// JavaScript Document

const ApiKey = '405727146c5e62374a697e641e27d';

var test = null;

$(document).ready(function() {
	var url = "http://api.meetup.com/groups.json/?zip=11211&topic=moms&order=members&key=405727146c5e62374a697e641e27d";
	
	$.getJSON(url, function(data){
		test = data;
	});
	
	console.log(test);
});