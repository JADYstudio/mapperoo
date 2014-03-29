var uWaterloo = new google.maps.LatLng(43.4689, -80.5400);
var siberia = new google.maps.LatLng(60, 105);
var MeetUp_APIKEY = "46d3d10574c5c51716b1f3b747d425a";
var map;
var markers = [];
var events = [];
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
	// if(navigator.geolocation) {
	// 	geolocate_on = true;
	// 	navigator.geolocation.getCurrentPosition(function(position) {
	// 		initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	// 		map.setCenter(initialLocation);
	// 	}, function() {
	// 		handleNoGeolocation(geolocate_on);
	// 	});
	// } else {
	// 	geolocate_on = false;
	// 	// Browser doesn't support Geolocation
	// 	handleNoGeolocation(geolocate_on);
	// }

	// Places the Map in the desired 'div'
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	
	// Adds the new Style of Map to the list of available Styles
	map.mapTypes.set("map_style", styledMap);
	map.setMapTypeId("map_style");

	// New Event
	/*google.maps.event.addListener(map, 'click', function(e) {
		placeMarker(e.latLng, map);
		});*/

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */(
		document.getElementById('search-bar'));
	//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
		/** @type {HTMLInputElement} */(input));

	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();

		var loc = places[0];
		//map.setCenter(loc.geometry.location);
		//placeMarker(loc);
		//console.log(loc);
		//console.log(loc.geometry.location.lng());
		//console.log(loc.geometry.location.lat());
		deleteMarkers();
		test(loc.geometry.location.lng(), loc.geometry.location.lat());
		map.setCenter(loc.geometry.location);
	});

	setTimeout(function() {
		console.log(markers);
	}, 1500);
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
	var query = "https://api.meetup.com/2/open_events?callback=?&lat="+lat+"&lon="+lon+"&page=30&radius=10&order=distance&key="+MeetUp_APIKEY;

	$.getJSON(query, function (data) {
		$.each(data.results, function (i, item) {
			//console.log(item);

			if(item["venue"]){
				var pos = new google.maps.LatLng(item.venue.lat, item.venue.lon);
				var marker = new google.maps.Marker({
					position: pos,
					map: map,
					title: item.name
				});
				markers.push(marker);
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

// NEW STUFF

function loadEvents() {
    var events = new Array;
    events[0] = new Object;
    events[0].name = "Fred";
    events[0].location = "here";
    events[0].startTime = "9";
    events[0].endTime = "10";
    events[0].description = "derf was here kill me knoweoiaf;wejfa;wigj;aer j iogaerjgoi";
    events[1] = new Object;
    events[1].name = "Fred";
    events[1].location = "here";
    events[1].startTime = "9";
    events[1].endTime = "10";
    events[1].description = "derf was here kill me knoweoiaf;wejfa;wigj;aer j iogaerjgoi";
    events[2] = new Object;
    events[2].name = "Fred";
    events[2].location = "here";
    events[2].startTime = "9";
    events[2].endTime = "10";
    events[2].description = "derf was here kill me knoweoiaf;wejfa;wigj;aer j iogaerjgoi";
    
    for( var i = 0; i < events.length; i++){
        $(".sidebar-nav #" + i).after("<li id='" + (i+1) + "'> <a href='#'>" + events[i].name + " <span class='glyphicon arrow'></span></a>"
            + "<ul><li><a href='#'>" + events[i].location + "</a></li><li><a href='#'>" + events[i].startTime
            + "</a></li><li><a href='#'>" + events[i].endTime + "</a></li><li id='p" + i + "'><a href='#'>"
            + events[i].description + "</a></li></ul></li>");
        $("#events-hidden .dropdown-menu #t" + i).after("<li id='t" + (i+1) + "'> <a href='#'>" + events[i].name + " </a>"
            + "<ul><li><a href='#'>" + events[i].location + "</a></li><li><a href='#'>" + events[i].startTime
            + "</a></li><li><a href='#'>" + events[i].endTime + "</a></li><li><a href='#'>"
            + events[i].description + "</a></li></ul></li>");
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
