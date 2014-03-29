// JavaScript Document

const ApiKey = '405727146c5e62374a697e641e27d';

var test = null;
var url = "https://api.meetup.com/2/open_events.xml?topic=photo&time=,1w&key=405727146c5e62374a697e641e27d";


$(document).ready(function() {	
	$.getJSON(url, function(data){
		console.log(data);
	});
});