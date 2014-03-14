var lat = 0;
var lng = 0;
var req;
var myloc = new google.maps.LatLng(lat, lng);
var map;
var infoBox = new google.maps.InfoWindow();
var places;
var mark;
var strobj;
var options = {
    zoom: 13,
    center: myloc,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var stations;
var sched;

try {
    req = new XMLHttpRequest();
}
catch(ms1) {
    document.getElementById("text").innerHTML = "IE not supported :(";
}

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
    if((step > 0 && begin >= end || (step < 0 && begin <= end))) {
        return [];
    };
    var result = [];
    for (var i = begin; step > 0 ? i < end : i > end; i += step) {
        result.push(i);
    }
    return result;
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
            var coords = [];
            sched = JSON.parse(strobj);
            if (sched.line == "Blue") {
                for (i in range(0, 12)) {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]), parseFloat(stations[i][3])));
                    stationMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(stations[i][2]), parseFloat(stations[i][3])),
                        title:stations [i][1],
                        map: map,
                        icon: "http://maps.google.com/mapfiles/kml/shapes/rail.png"
                    });
                    stationMarker.setMap(map);

                    google.maps.event.addListener(stationMarker, 'click', function() {
                        infoBox.setContent(stationMarker.title);
                        infoBox.open(map, stationMarker);
                    });
                }

                Path = new google.maps.Polyline({
                    Path: coords,
                    geodesic:true,
                    strokeColor: '#0059FC',
                    strokeOpacity: 1.0,
                    strokeWeight: 6
                });

                Path.setMap(map);
            }
            if (sched.line == "Orange") {
                for (i in range(12, 31)) {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])));
                    stationMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])),
                        title: stations[i][1],
                        map: map,
                        icon: "http://maps.google.com/mapfiles/kml/shapes/rail.png"

                    });
                    stationMarker.setMap(map);
                    google.maps.event.addListener(station_mark, 'click', function() {
                        infoBox.setContent(station_mark.title);
                        infoBox.open(map, station_mark);
                    });
                }

                Path = new google.maps.Polyline({
                    path: Coordinates,
                    geodesic: true,
                    strokeColor: '#FFA500',
                    strokeOpacity: 1.0,
                    strokeWeight: 6
                });

                Path.setMap(map);
            }
            if (sched.line == "Red") {
                for (i in range(31, 53))   {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])));
                    stationMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])),
                        title: stations[i][1],
                        map: map,
                        icon: "http://maps.google.com/mapfiles/kml/shapes/rail.png"

                    });
                    stationMarker.setMap(map);
                    google.maps.event.addListener(station_mark, 'click', function() {
                        infoBox.setContent(station_mark.title);
                        infoBox.open(map, station_mark);
                    });
                }

                Path = new google.maps.Polyline({
                    path: Coordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 6
                });

                Path.setMap(map);
            }
        }
        else if (mbtaxhr.readyState == 4 && mbtaxhr.status == 500)  {
            alert("Failure!");
        }

    };

    mbtaxhr.send(null);

}

function importCSV() {
/*
    var request = new XMLHttpRequest();
    request.open("GET", "listofstations.txt", false);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            jsontxt = request.responseText.stringify();

        }
    }
    request.send("");
*/
    var str = '[{"color":"blue","stations":[{"name":"Wonderland","lat":42.41342,"lng":-70.991648},{"name":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"name":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"name":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"name":"Orient Heights","lat":42.386867,"lng":-71.004736},{"name":"Wood Island","lat":42.3796403,"lng":-71.02286539},{"name":Airport,"lat":42.374262,"lng":-71.030395},{"name":"Maverick","lat":42.36911856,"lng":-71.03952958},{"name":"Aquarium","lat":42.359784,"lng":-71.051652},{"name":"State Street","lat":42.358978,"lng":-71.057598},{"name":Government Center,"lat":42.359705,"lng":-71.059215},{"name":"Bowdoin","lat":42.361365,"lng":-71.062037}]},{"color":"orange","stations":[{"name":"Oak Grove","lat":42.43668,"lng":-71.071097},{"name":"Malden Center","lat":42.426632,"lng":-71.07411},{"name":"Wellington","lat":42.40237,"lng":-71.077082},{"name":"Sullivan","lat":42.383975,"lng":-71.076994},{"name":"Community College","lat":42.373622,"lng":-71.069533},{"name":"North Station","lat":42.365577,"lng":-71.06129},{"name":"Haymarket","lat":42.363021,"lng":-71.05829},{"name":"State Street","lat":42.358978,"lng":-71.057598},{"name":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"name":"Chinatown","lat":42.352547,"lng":-71.062752},{"name":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"name":"Back Bay","lat":42.34735,"lng":-71.075727},{"name":"Mass Ave","lat":42.341512,"lng":-71.083423},{"name":"Ruggles","lat":42.336377,"lng":-71.088961},{"name":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"name":"Jackson Square","lat":42.323132,"lng":-71.099592},{"name":"Stony Brook","lat":42.317062,"lng":-71.104248},{"name":"Green Street","lat":42.310525,"lng":-71.107414},{"name":"Forest Hills","lat":42.300523,"lng":-71.113686}],{"color":"red","stations":[{"name":"Alewife","lat":42.395428,"lng":-71.142483},{"name":"Davis","lat":42.39674,"lng":-71.121815},{"name":"Porter Square","lat":42.3884,"lng":-71.119149},{"name":"Harvard Square","lat":42.373362,"lng":-71.118956},{"name":"Central Square","lat":42.365486,"lng":-71.103802},{"name":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653},{"name":"Charles/MGH","lat":42.361166,"lng":-71.070628},{"name":"Park Street","lat":42.35639457,"lng":-71.0624242},{"name":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"name":"South Station","lat":42.352271,"lng":-71.055242},{"name":"Broadway","lat":42.342622,"lng":-71.056967},{"name":"Andrew","lat":42.330154,"lng":-71.057655},{"name":"JFK/UMass","lat":42.320685,"lng":-71.052391},{"name":"North Quincy","lat":42.275275,"lng":-71.029583},{"name":"Wollaston","lat":42.2665139,"lng":-71.0203369},{"name":"Quincy Center","lat":42.251809,"lng":-71.005409},{"name":"Quincy Adams","lat":42.233391,"lng":-71.007153,
Red,Braintree,42.2078543,-71.0011385},{"name":"Savin Hill","lat":42.31129,"lng":-71.053331},{"name":"Fields Corner","lat":42.300093,"lng":-71.061667},{"name":"Shawmut","lat":42.29312583,"lng":-71.06573796},{"name":"Ashmont","lat":42.284652,"lng":-71.064489}]';
    strobj = JSON.parse(str);

}