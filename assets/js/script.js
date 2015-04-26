var map;
var bounds;
var markers = [];
var place;
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

	google.maps.event.addListener(autocomplete, 'place_changed', function() {

		place = autocomplete.getPlace();
		$('#keywords').val(place.name);
		deleteMarkers();
		actionSearch('general');
	});
	
	$('#searchform').submit(function(event) {
		event.preventDefault();
//		google.maps.event.trigger(autocomplete, 'place_changed');
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

function actionSearch(callType) {
	
	var keywords = document.getElementById('keywords');
	var latlng = document.getElementById('latlng');
	
	var marker = new google.maps.Marker({
		map : map,
		anchorPoint : new google.maps.Point(0, -29)
	});
	marker.setVisible(false);
//	var place = autocomplete.getPlace();
	if (!place.geometry) {
		alert('Please choose correct location');
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

//	var address = '';
//	if (place.address_components) {
//		address = [
//				(place.address_components[0]
//						&& place.address_components[0].short_name || ''),
//				(place.address_components[1]
//						&& place.address_components[1].short_name || ''),
//				(place.address_components[2]
//						&& place.address_components[2].short_name || '') ]
//				.join(' ');
//	}

//	keywords.value = place.name;
//	latlng.value = place.geometry.location;
	
	$.ajax({
		method : "GET",
		url : "get_tweets",
	    dataType: "json",
		async: true,
		data : {
			keywords : place.name,
			latlng : place.geometry.location.k+'+'+place.geometry.location.D,
			radius : '50km',
			calltype: callType
		},
		success: function (results) {
			
			var infoWindow = new google.maps.InfoWindow();
			var i = 0;		
			
			if(null == results.tweets) {
				return;
			}
			
			var latlngStr = results.latlng.split(",",2);
			var lat = parseFloat(latlngStr[0]);
			var lng = parseFloat(latlngStr[1]);
			
			map.setCenter(new google.maps.LatLng(lat, lng));
			map.setZoom(12);
			
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
}

//$('form').on("keyup keypress", function(e) {
//  var code = e.keyCode || e.which; 
//  if (code  == 13) {               
//    e.preventDefault();
//    return false;
//  }
//});

$(document).on('click', 'a.history-link' ,function() {
	event.preventDefault();
	$('#history-modal').modal('hide');
	var iId = $(this).attr('id');
	
	var keywords = $('#'+iId+'-keywords').val();
	var latlng = $('#'+iId+'-latlng').val();
	
	$('#keywords').val(keywords);
	
	place.name = keywords;
	var temp = latlng.split(',');
	place.geometry.location.k = temp[0];
	place.geometry.location.D = temp[1];
	
	deleteMarkers();
	actionSearch('history');
});

$(document).ready(function() {
	
	$('#history-button').click(function(event) {
		event.preventDefault();
		$.ajax({
			method : "GET",
			url : config.base+'/index.php/'+'history',
			async: true,
			success: function (results) {
				$('#history-modal .modal-content div').remove();
				$('#history-modal .modal-content').append(results);
			}
		});
		$('#history-modal').modal('show');
	});
	
	
	
});
