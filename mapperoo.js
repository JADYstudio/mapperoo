var uWaterloo = new google.maps.LatLng(43.4689, -80.5400);
var siberia = new google.maps.LatLng(60, 105);
var MeetUp_APIKEY = "46d3d10574c5c51716b1f3b747d425a";
var map;
var markers = new Array();
var events = new Array();
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
			map.setCenter(initialLocation);
		}, function() {
			handleNoGeolocation(geolocate_on);
		});
	} else {
		geolocate_on = false;
		// Browser doesn't support Geolocation
		handleNoGeolocation(geolocate_on);
	}

	// Places the Map in the desired 'div'
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
		
	var geoMarker = new GeolocationMarker();
    geoMarker.setCircleOptions({fillColor: '#808080'});

    google.maps.event.addListenerOnce(geoMarker, 'position_changed', function() {
    	map.setCenter(this.getPosition());
    	map.fitBounds(this.getBounds());
    });

	google.maps.event.addListener(geoMarker, 'geolocation_error', function(e) {
	  alert('There was an error obtaining your position. Message: ' + e.message);
	});

	geoMarker.setMap(map);


	
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
			//console.log(item);

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
	var contents = "<a href = \"" + event.url + "\">" + event.name + "</a>" + 
					"/nStart Time: " + event.startTime.toString() +
					"/nLocation: " + event.location + 
					"/nDescription: " + event.desc;
	var infowindow = new google.maps.InfoWindow({
		content: contents
	});
	infoWindows.push(infowindow);

	var listener = new google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(marker.get('map'), marker);
	});
	listeners.push(listener);
}

google.maps.event.addDomListener(window, 'load', initialize);
