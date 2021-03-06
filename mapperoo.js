var uWaterloo = new google.maps.LatLng(43.4689, -80.5400);
var siberia = new google.maps.LatLng(43.467871, -80.5400);
var MeetUp_APIKEY = "26157830757d475e4b557d7e5d725b35";
var map;
var loc;
var ind = 0;
var markers = new Array();
var events = new Array();
var created_events = new Array();
var created_markers = new Array();
var listeners = new Array();
var infoWindows = new Array();
var geolocate_on = new Boolean();

function initialize() {

	// Contains changes the Style of the Map
	var styleArray = [
		{
			featureType: "all",
			stylers: [
				{ saturation: -80 }
			]
		},
		{
			featureType: "road.arterial",
			elementType: "geometry",
			stylers: [
				{ hue: "#00ffee" },
				{ saturation: 50 }
			]
		},
		{
			featureType: "poi.business",
			elementType: "labels",
			stylers: [
				{ visibility: "off" }
			]
		}
	];

	// Declares a new Style of Map
	var styledMap = new google.maps.StyledMapType(styleArray,
						{name: "Styled Map"});

	// Affects the Map Options
	var mapOptions = {
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: uWaterloo,

		disableDefaultUI: true,

		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.TOP_RIGHT,
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
		},

		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.DEFAULT,
			position: google.maps.ControlPosition.RIGHT_TOP
		},

	};

	// Try Geolocation
		if(navigator.geolocation) {
		geolocate_on = true;
		navigator.geolocation.getCurrentPosition(function(position) {
		initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		test(position.coords.longitude, position.coords.latitude);
		map.setCenter(initialLocation);		
		}, function() {
		handleNoGeolocation(geolocate_on);
		});
		}

	// Places the Map in the desired 'div'
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	
	// Geolocation Marker
	GeoMarker = new GeolocationMarker();
	GeoMarker.setCircleOptions({fillColor: '#808080'});

	google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
	  map.setCenter(this.getPosition());
	});

	GeoMarker.setMap(map);
	
	// Adds the new Style of Map to the list of available Styles
	map.mapTypes.set("map_style", styledMap);
	map.setMapTypeId("map_style");

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */(
		document.getElementById('search-bar'));

	var searchBox = new google.maps.places.SearchBox((input));

	google.maps.event.addListener(searchBox, 'places_changed', function getThePlace() {
		var places = searchBox.getPlaces();

		var loc = places[0];

		$(".to-del").empty();
		$(".to-del").append("<li class='hidden' id = '0'></li>");
		deleteMarkers();
		test(loc.geometry.location.lng(), loc.geometry.location.lat());
		map.setCenter(loc.geometry.location);
	});

	// Create Event Form Search Bar
	var c_input =(document.getElementById('location'));

	var createBox = new google.maps.places.SearchBox((c_input));

	google.maps.event.addListener(createBox, 'places_changed', function() {
		var places = createBox.getPlaces();
		loc = places[0];
	});
}

function placeMarker(place) {
  var marker = new google.maps.Marker({
      position: place.geometry.location,
      title: place.name,
      map: map
  });

  map.setCenter(place.geometry.location);
}

function handleNoGeolocation(flag){
	if(flag == true){
		alert("Geolocation service failed.");
		map.setCenter(siberia);
	} else {
		alert("Geolocation not available");
		map.setCenter(siberia);
	}
}

function test(lon, lat){
	var query = "https://api.meetup.com/2/open_events?callback=?&lat="+lat+"&lon="+lon+"&page=10&radius=10&order=distance&key="+MeetUp_APIKEY;
	var ind = 0;
	events = new Array();

	$.getJSON(query, function (data) {
		$.each(data.results, function (i, item) {
			if(item["venue"]){
				var pos = new google.maps.LatLng(item.venue.lat, item.venue.lon);
				var marker = new google.maps.Marker({
					position: pos,
					map: map,
					title: item.name
				});
				markers.push(marker);

				var new_event = new Object();
				new_event.name = item.name;
				new_event.location = item.venue.name + "," 
									+ item.venue.address_1 + "," 
									+ item.venue.city + "," 
									+ item.venue.state + "," 
									+ item.venue.country;
				new_event.startTime = new Date();
				new_event.startTime.setTime(item.time);
				new_event.url = item.event_url;
				new_event.desc = item.description;
				events.push(new_event);

				var li_id = "<li id = '" + (ind+1) + "'>";
				var a_id = "<a id = 'eve" + (ind+1) + "'>";
   
				$("#event-details #" + ind).after(li_id+a_id+events[ind].name+"</a></li>");
				
				var modify = document.getElementById("eve" + (ind+1) + "");
				modify.href = events[ind].url;
				modify.target = "_blank";

				addInfoWindow(events[ind], marker);
				ind++;
				map.setZoom(15);
			}
		});
	});
}

// Sets the map on all markers in the array.
function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
	setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}

function deleteInfoWindows(){
	for(var i = 0; i < infoWindows.length; i++){
		infoWindows[i].close();
	}
	infoWindows = new Array();
}

function deleteListeners(){
	for(var i = 0; i < listeners.length; i++){
		google.maps.event.removeListener(listeners[i]);
	}
	listeners = new Array();
}

function addInfoWindow(event, marker){
	var contents = "<p><a href = \"" + event.url + "\">" + event.name + "</a>" + 
					"<br/><br/>Start Time: " + event.startTime.toString() +
					"<br/><br/>Location: " + event.location + 
					"<br/><br/>Description: " + event.desc + "</p>";
	var infowindow = new google.maps.InfoWindow({
		content: contents
	});
	infoWindows.push(infowindow);

	var listener = new google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(marker.get('map'), marker);
	});
	listeners.push(listener);
}

function createEvent(name, date, desc){
	var new_event = new Object();
	new_event.name = name;
	new_event.location = loc.name + "," 
						+ loc.formatted_address;
	new_event.startTime = date;
	new_event.url = null;
	new_event.desc = desc;
	created_events.push(new_event);

	var marker = new google.maps.Marker({
		position: loc.geometry.location,
		map: map,
		title: loc.name
	});
	created_markers.push(marker);

	map.setCenter(loc.geometry.location);

	var li_id = "<li id = 'y" + (ind+1) + "'>";
	var a_id = "<a id = 'yeve" + (ind+1) + "'>";
   
	$("#event-details #y" + ind).after(li_id+a_id+created_events[ind].name+"</a></li>");
				
	var modify = document.getElementById("yeve" + (ind+1) + "");
	modify.href = created_events[ind].url;
	modify.target = "_blank";

	addInfoWindow(created_events[ind], marker);
	ind++;
}

function newEvent(name, place, start, description){
	var num;
	if(typeof(Storage)!=="undefined"){
		if(localStorage.getItem("newestNum") == null){
			localStorage.setItem("newestNum", 0);
			num = 0;
		} else {
			num=parseInt(localStorage.getItem("newestNum"));
		}

		var eventData = [
						name,
						place,
						start,
						description];

		localStorage.setItem(num, JSON.stringify(eventData));

	}else{
		console.log("Sorry! No Web Storage support..");
	}
}

function getEvents(){
	var savedEvents = [];
	var keyName;

	for(var i = 0; i < localStorage.length; i++){
		keyName = localStorage.key(i);
		savedEvents[i] = localStorage.getItem(keyName);
	}
	return savedEvents;	
}

function deleteEvent(value){
	for(var i = 0; i < localStorage.length; i++){
		keyName = localStorage.key(i);
		if (localStorage.getItem(keyName) == value){
			localStorage.removeItem(keyName);
		}
	}
}

$("#submitbutton").click(function(){
	var name = $("#name").val();
	var date = $("#date").val();
	var desc = $("#desc").val();
	createEvent(name, date, desc);
	newEvent(name, loc, date, desc);
})

google.maps.event.addDomListener(window, 'load', initialize);
