// JavaScript Document

const ApiKey = '405727146c5e62374a697e641e27d';

var test = null;
var url = "https://api.meetup.com/2/open_events.xml?topic=photo&time=,1w&key=405727146c5e62374a697e641e27d";
/*$(document).ready(function() {
	var url = "http://api.meetup.com/groups.json/?zip=11211&topic=moms&order=members&key=405727146c5e62374a697e641e27d";
	
	$.getJSON(url, function(data){
		test = data;
	});
	
	console.log(test);
});*/

$(document).ready(function(){
  $("button").click(function(){
    $.getJSON(url,function(result){
      $.each(result, function(i, field){
        $("div").append(field + " ");
      });
    });
  });
});