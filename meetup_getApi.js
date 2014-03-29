// JavaScript Document

function jsonCall(){

var meetupAPI = "http://api.meetup.com/groups.json/?zip=11211&topic=moms&order=members&key=405727146c5e62374a697e641e27d";
$.getJSON("https://api.meetup.com/2/groups?&sign=true&member_id=8377069&page=20&api&key=405727146c5e62374a697e641e27d&only=name,link", 
function (data) {
    var htmlString = "";
    $.each(data.items, function (i, item) {
        htmlString += '<h3><a href="' + item.link + '" target="_blank">' + item.name + '</a></h3>';
		console.log(data);
    });
	});



}