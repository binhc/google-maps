// console.log(cities)

//initMap is essentially document.ready 
function initMap(){
	console.log('map loaded')

	myLatlng = {
		lat:40.0000, 
		lng: -98.0000
	};
	// Init the map to load at geoCenter, zoom 4 
	var map = new google.maps.Map(document.getElementById('map'),{
		zoom:4, 
		center: myLatlng
	});
	var markers = [];
	// global infowindow for everyone to share 
	var infoWindow = new google.maps.InfoWindow({});
	// loop through the cities array which is in cities.js 
	var listHTML = '';
	cities.map((city)=>{
		createMarker(city);	
		listHTML += addCityToList(city);

	});

	$('#cities-table tbody').html(listHTML);

	$('#filter-form').submit(function(event){
		// wipe out all the markers
		markers.map((marker)=>{
			marker.setMap(null)
		})
		event.preventDefault();
		var userSearch = $('#filter-input').val().toLowerCase();
		var listHTML = '';
		cities.map((city)=>{
			var cityName = city.city.toLowerCase();
			if (cityName.indexOf(userSearch) > -1){
				// the city we are on contain the search text the user entered
				createMarker(city);	
				listHTML += addCityToList(city);
			}
		})
		$('#cities-table tbody').html(listHTML);
	});

	function addCityToList(city){
	var newHTML = '<tr>';
		newHTML += `<td class="city-name">${city.city}</td>`
		newHTML += `<td class="city-state">${city.state}</td>`
		newHTML += `<td class="city-directions"><button class="btn btn-primary">Get Directions</button></td>`
		newHTML += `<td class="city-zoom"><button class="btn btn-primary">Zoom to city</button></td>`
	newHTML += '</tr>'
	return newHTML
	}

	function createMarker(city){
		var cityLL= {
			lat: city.lat,
			lng: city.lon
		}
		var marker = new google.maps.Marker({
			position: cityLL, 
			map: map, 
			// city property of the city object 
			title: city.city, 
		});
		// add a click listener to this marker 
		// add listener takes 3 args: 1) what 2) event 3) code to run 
		google.maps.event.addListener(marker, 'click', ()=>{
			// all infoWindows because they are constructors, have a set content method which is like .html 
			var infoWindowHTML = `<h2>${city.city}</h2>`;
			infoWindowHTML += `<h4> City Population </h4>`
			infoWindow.setContent(infoWindowHTML);

			// open takes 2 args 
			// 1) map to open the infowindow
			// 2. where to put the infoWindow on the map 
			infoWindow.open(map,marker);
		});
		markers.push(marker);
	} //createMarker
}


