// JavaScript Document

function newEvent(name, lon, lat, start, description, id){
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
	  lon, 
	  lat, 
	  start, 
	  description,
	  id];
	  
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