var map;
var a = -1;
var markers = [];
var infowindows = [];
// var description = ["123","456","789","111","222"];
// var position = [
// 	{label:'哈哈哈哈哈',lat:25.0336962,lng:121.5643673},
// 	{label:'哈哈哈哈哈哈哈哈哈哈',lat:25.0333698,lng:121.5641564},
// 	{label:'C',lat:25.033899,lng:121.564329},
// 	{label:'哈哈哈哈哈',lat:25.0338407,lng:121.5645269},
// 	{label:'E',lat:25.0336377,lng:121.5645727}
// ];

function moveToLocation(index) {
	map.panTo(new google.maps.LatLng(eventsArray[index].latitude, eventsArray[index].longitude)); 		
}

function initMap() {
	console.log(eventsArray);
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 19,
		center: {
			lat: 25.1508552,
			lng: 121.77268630000003
		}
	});

	for (var i = 0; i < eventsArray.length; i++) {
		addMarker(i);
	}
}

function addMarker(e) {
	markers[e] = new google.maps.Marker({
		position: {
			lat: eventsArray[e].latitude,
			lng: eventsArray[e].longitude
		},
		map: map,
		label: eventsArray[e].position
	});

	infowindows[e] = new google.maps.InfoWindow({
		content: '<h1>' + eventsArray[e].title + '</h1><br><p>' + eventsArray[e].description + '</p>'
	});

	markers[e].addListener('click',function(){
		a = a * -1;
		if(a > 0){
			infowindows[e].open(map, markers[e]);
		} else {
			infowindows[e].close();
		}
	});
}
