var map;
var bounds;
var markers = [];
function initialize() {
	var mapOptions = {
		center : new google.maps.LatLng(-33.8688, 151.2195),
		zoom : 13
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
	bounds = new google.maps.LatLngBounds();

	var input = document.getElementById('keywords');

	var latlng = document.getElementById('latlng');

	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);

	var infowindow = new google.maps.InfoWindow();
	

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		infowindow.close();
		var marker = new google.maps.Marker({
			map : map,
			anchorPoint : new google.maps.Point(0, -29)
		});
		marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			return;
		}

		// If the place has a geometry, then present it on a
		// map.
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17); // Why 17? Because it looks good.
		}
		marker.setIcon(
		({
			url : place.icon,
			size : new google.maps.Size(71, 71),
			origin : new google.maps.Point(0, 0),
			anchor : new google.maps.Point(17, 34),
			scaledSize : new google.maps.Size(35, 35)
		}));
		marker.setPosition(place.geometry.location);
		marker.setVisible(true);
		markers.push(marker);

		var address = '';
		if (place.address_components) {
			address = [
					(place.address_components[0]
							&& place.address_components[0].short_name || ''),
					(place.address_components[1]
							&& place.address_components[1].short_name || ''),
					(place.address_components[2]
							&& place.address_components[2].short_name || '') ]
					.join(' ');
		}

		infowindow.setContent('<div><strong>' + place.name + '</strong><br>'
				+ address);
		infowindow.open(map, marker);
		input.value = place.name;
		latlng.value = place.geometry.location;
	});
}
google.maps.event.addDomListener(window, 'load', initialize);

function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

//Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setAllMap(null);
}

//Shows any markers currently in the array.
function showMarkers() {
	setAllMap(map);
}

//Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}

$(document).ready(function() {
	
	$('#searchform').submit(function(event) {
		event.preventDefault();
		deleteMarkers();
		var keywords = $('#keywords').val();
		var latlng = $('#latlng').val();
		
		$.ajax({
			method : "POST",
			url : "get_tweets",
		    dataType: "json",
			async: true,
			data : {
				keywords : keywords,
				latlng : latlng
			},
			success: function (results) {
				
				var infoWindow = new google.maps.InfoWindow();
				var i = 0;		
				
				if(null == results.tweets) {
					return;
				}
				
				$.each(results.tweets.statuses, function() {
					if ((typeof this.coordinates != "undefined") && (null != this.coordinates)) {

						var twttext = this.text;
						var twtdate = this.created_at;
						var latlng = new google.maps.LatLng(this.coordinates.coordinates[1], this.coordinates.coordinates[0]);
				       
						var image = {
							    url: this.user.profile_image_url,
							    // This marker is 36 pixels wide by 36 pixels tall.
							    size: new google.maps.Size(36, 36),
							    // The origin for this image is 0,0.
							    origin: new google.maps.Point(0,0),
							    // The anchor for this image is the base of the flagpole at 0,32.
							    anchor: new google.maps.Point(0, 32)
							  };
						
						marker = new google.maps.Marker({
							icon: image,
				            position: latlng,
				            map: map,
				            visible: true
				        });
				        markers.push(marker);
				        
				        // Allow each marker to have an info window    
				        google.maps.event.addListener(marker, 'click', (function(marker, i) {
				            return function() {
				                infoWindow.setContent('<div><p>' + twttext + '</p><br>' + twtdate);
				                infoWindow.open(map, marker);
				            }
				        })(marker, i));
				        i++;
					}
				});
			showMarkers();
		},
		error: function (request, status, error) {
	        alert(request.responseText);
	    }
			
		});
	});
	
});
