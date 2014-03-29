var uWaterloo = new google.maps.LatLng(43.4689, -80.5400);
const APIKEY = "26157830757d475e4b557d7e5d725b35";
var map;
var geolocate_on = false;

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
		zoom: 15,
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

/* 	// Try Geolocation
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude,
											position.coords.longitude);

			map.setCenter(pos);
    	}, 
    	geolocate_on = true);
	} else {
		// Browser doesn't support Geolocation
		map.setCenter(uWaterloo);
	} */

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
	
	// Creates a new list of Markers
	var markers = [];

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */(
		document.getElementById('search-bar'));
	//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
		/** @type {HTMLInputElement} */(input));

	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();

		for (var i = 0, marker; marker = markers[i]; i++) {
			marker.setMap(null);
		}
		// For each place, get the icon, place name, and location.
		markers = [];

		for (var i = 0, place; place = places[i]; i++) {
			// Create a marker for each place.
			/*var marker = new google.maps.Marker({
			map: map,
			title: place.name,
			position: place.geometry.location
			});*/
			placeMarker(place);
			//markers.push(marker);
			//map.setCenter(place.geometry.location);
		}
	});

}

function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
				'callback=initialize';
	document.body.appendChild(script);
}

function loadEvents() {
    var events = new Array;
	
	test(43.4689, -80.5400, function(arr){
		events = arr;
		
		for(var i = 0; i < events.length; i++){
			var li_id = "<li id = '" + (i+1) + "'>";
			var a_id = "<a id = 'eve" + (i+1) + "'>";
			
			$("#event-details #" + i).after(li_id+a_id+events[i].name+"</a></li>");
			var modify = document.getElementById("eve" + (i+1) + "");
			modify.href = events[i].event_url;
		}
	});
}

function test(lat, lon, back_fn){
 
var query = "https://api.meetup.com/2/open_events?callback=?&lat="+lat+"&lon="+lon+"&order=distance&page=7&radius=10&key="+APIKEY;

var results = [];

$.getJSON(query, function (data) {
  $.each(data.results, function (i, item) {
   results [i] = item; 
  });
  back_fn(results);
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

google.maps.event.addDomListener(window, 'load', initialize);
