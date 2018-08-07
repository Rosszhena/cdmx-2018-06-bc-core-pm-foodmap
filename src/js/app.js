var map;
var infowindow;

var request;
var service;
var markers = [];

function initialize(){
    var center = new google.maps.LatLng(19.404530, -99.163885);
    map = new google.maps.Map(document.getElementById("map"),{
        center:center,
        zoom:15
    });
    
    var request = {
        location: center,
        radius: 500,
        types: ['Restaurante']
    };
    
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
   
    service.nearbySearch(request, callback);


    google.maps.event.addListener(map, 'rightclick',function(event){
        map.setCenter(event.LatLng)
        clearResults(markers)

        var request = {
            location: event.LatLng,
            radius: 500,
            types: ['restaurant']
        };
        service.nearbySearch(request, callback);
    })
}

function callback(results, status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
        for(var i = 0; i < results.length; i++){
            markers.push(createMarker(results[i]));
        }
    }
}

function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
        
         });

         google.maps.event.addListener(marker, 'click',function(){
             console.log(place.name)
             console.log(place.vicinity)
             infowindow.setContent(place.name + " " +  place.vicinity);
             infowindow.open(map, this);
             maxWidth: 200
         });

         return marker;
     }      
     
     function clearResults(markers){
         for(var m in markers){
             markers[m].setMap(null)
         }
         markers = []
     }

google.maps.event.addDomListener(window, 'load', initialize);