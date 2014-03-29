var uWaterloo = new google.maps.LatLng(43.4689, -80.5400);
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
        $(".sidebar-nav #" + i).after("<li id='" + (i+1) + "'> <a href='#' rel='popover data-content='It's so simple to create a tooltop for my website!' data-original-title='Twitter Bootstrap Popover'>" + events[i].name + " <span class='glyphicon arrow'></span></a>"
            + "<ul><li><a href='#'>" + events[i].location + "</a></li><li><a href='#'>" + events[i].startTime 
            + "</a></li><li><a href='#'>" + events[i].endTime + "</a></li><li id='p" + i + "'><a href='#'>"
            + events[i].description + "</a></li></ul></li>");
        $("#events-hidden .dropdown-menu #t" + i).after("<li id='t" + (i+1) + "'> <a href='#'>" + events[i].name + " </a>"
            + "<ul><li><a href='#'>" + events[i].location + "</a></li><li><a href='#'>" + events[i].startTime 
            + "</a></li><li><a href='#'>" + events[i].endTime + "</a></li><li><a href='#'>"
            + events[i].description + "</a></li></ul></li>");
            
        $("body #popover" + i).after("<script id='popover" + (i+1) + "'>$(function (){$('#" + i + ").popover();});</script>");
    }
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
