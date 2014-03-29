var uWaterloo = new google.maps.LatLng(43.4689, -80.5400);
var siberia = new google.maps.LatLng(60, 105);
var map;
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
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		//center: uWaterloo,

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
			placeMarker(place);
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
		map.setCenter(uWaterloo);
	} else {
		alert("Geolocation not available");
		map.setCenter(uWaterloo);
	}
}

google.maps.event.addDomListener(window, 'load', initialize);
