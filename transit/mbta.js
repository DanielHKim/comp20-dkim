var lat = 0;
var lng = 0;
var req = new XMLHttpRequest();
var myloc = new google.maps.LatLng(lat, lng);
var map;
var infoBox = new google.maps.InfoWindow();
var places;
var mark;
var options = {
    zoom: 13,
    center: myloc,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var stations;
var sched;

function init() {

    getMyLocation();
    importCSV();
}

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;

            if(lat !=0 && lng != 0) {
                map = new google.maps.Map(document.getElementById("map_canvas"), options);
                renderMap();
            }

        });
    }
    else {
        alert("Your browser does not support geolocation!");
    }
}

function range(begin, end, step) {
    if (typeof end == "undefined") {
        end = begin;
        begin = 0;
    };
    if (typeof step == "undefined") {
        step = 1;
    };
    if((step > 0 && begin >= end || (step < 0 && begin <= end)) {
        return [];
    };
       var result = [];
       for (var i = begin; step > 0 ? i < end : i > end; i += step) {
           result.push(i);
       }
       return result;
      }
}

function renderMap() {
    myloc = new google.maps.LatLng(lat, lng);
    map.panTo(myloc);

    marker = new google.maps.Marker({
        position: me,
        title: "You are here",
        map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoBox.setContent(marker.title);
        infoBox.open(map, marker);
    });

    mbtaxhr = new XMLHttpRequest();
    mbtaxhr.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
    mbtaxhr.onreadystatechange = function() {
        if(mbtaxhr.readyState == 4 && mbtaxhr.status == 200) {
            coords = new Array();
            sched = JSON.parse(mbtaxhr.responseText);
            if (sched.line == "blue") {
                for (i in range(0, 12)) {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]), parseFloat(stations[i][3])));
                    stationMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(stations[i][2]), parseFloat(stations[i][3])),
                        title:stations [i][1],
                        map: map,
                        icon: = "http://maps.google.com/mapfiles/kml/shapes/rail.png"
                    });
                    stationMarker.setMap(map);

                    var google.maps.event.addListener(stationMarker, 'click', function() {
                        infoBox.setContent(stationMarker.title);
                        infoBox.open(map, stationMarker);
                    });
                }

                var Path = new google.maps.Polyline({
                    Path: coords,
                    geodesic:true,
                    strokeColor: '#0059FC',
                    strokeOpacity: 1.0,
                    strokeWeight: 6
                });

                path.setMap(map);
            }
            if (sched.line == "orange") {
                for (i in range(12, 31)) {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])));
                    stationMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])),
                        title: stations[i][1],
                        map: map,
                        icon: "http://maps.google.com/mapfiles/kml/shapes/rail.png"

                    });
                    stationMarker.setMap(map);
                    var google.maps.event.addListener(station_mark, 'click', function() {
                        infoBox.setContent(station_mark.title);
                        infoBox.open(map, station_mark);
                    });
                }

                var Path = new google.maps.Polyline({
                    path: Coordinates,
                    geodesic: true,
                    strokeColor: '#FFA500',
                    strokeOpacity: 1.0,
                    strokeWeight: 6
                });

                Path.setMap(map);
            }
            if (sched.line == "red") {
                for (i in range (31, 53))   {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])));
                    stationMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])),
                        title: stations[i][1],
                        map: map,
                        icon: "http://maps.google.com/mapfiles/kml/shapes/rail.png"

                    });
                    stationMarker.setMap(map);
                    var google.maps.event.addListener(station_mark, 'click', function() {
                        infoBox.setContent(station_mark.title);
                        infoBox.open(map, station_mark);
                    });
                }

                var Path = new google.maps.Polyline({
                    path: Coordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 6
                });

                Path.setMap(map);
            }
        }
        else if (xhr.readyState == 4 && xhr.status == 500)  {
            alert("Failure!");
        }

    };

    mbtaxhr.send(null);

}

function importCSV() {
    var request = new XMLHttpRequest();
    request.open("GET", "listofstations.txt", false);


}