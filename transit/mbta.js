var lat = 0;
var lng = 0;
var shortest = 0;
var closest;
var req;
var myloc = new google.maps.LatLng(lat, lng);
var map;
var infoBox = new google.maps.InfoWindow();
var places;
var pers_loc;

var options = {
    zoom: 13,
    center: myloc,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var stations;
var sched;
var red = new Array();
var blue = new Array();
var orange = new Array();
var blueIcon = "long-distance-train.jpg";

try {
    req = new XMLHttpRequest();
}
catch(ms1) {
    document.getElementById("text").innerHTML = "IE not supported";
}

function init() 
{
    getMyLocation();
    importCSV();
}

function add_dist() 
{
    pers_loc.setTitle("You are here, nearest T stop is " + smallest + " miles away.");

    infoBox.setContent(pers_loc.title);
    infoBox.open(map, pers_loc);

    google.maps.event.addListener(pers_loc, 'click', function() {
        infoBox.setContent(pers_loc.title);
        infoBox.open(map, pers_loc);
    });
}


function draw_dist() 
{
    var pt = [myloc, closest.getPosition()];
    var Path = new google.maps.Polyline({
        path: pt,
        geodesic: true,
        strokeColor: '#CCCCCC',
        strokeOpacity: 0.85,
        strokeWeight: 12
    });

    Path.setMap(map);
    add_dist();
}


function getMyLocation() 
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            if(lat !=0 && lng != 0) {
                map = new google.maps.Map(document.getElementById("map"), options);
                renderMap();
            }

        });
    }
    else {
        alert("Your browser does not support geolocation!");
    }
}

function range(begin, end, step) 
{
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


function dist(color)
{
    var pts = new Array();
    var results = new Array();

    if (color == "red") {
        pts = red;
    }
    if (color == "orange") {
        pts = orange;
    }
    if (color == "blue") {
        pts = blue;
    }

    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }

    var min_dist = 1000;
    var index;

    for (var i in range(0, pts.length)) {
        var lat2 = lat;
        var lng2 = lng;
        var lat1 = pts[i].getPosition().lat();
        var lng1 = pts[i].getPosition().lng();

        var R = 6371;
        var x1 = lat2 - lat1;
        var d_lat = x1.toRad();
        var x2 = lng2 - lng1;
        var d_lng = x2.toRad();

        var a = Math.sin(d_lat / 2) * Math.sin(d_lat / 2) + 
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
            Math.sin(d_lng/2) * Math.sin(d_lng/2); 

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;

        if (d < min_dist) {
            min_dist = d;
            index = i;
        }
    }

    smallest = min_dist;
    closest = pts[index];

    draw_dist();

}



function renderMap() {
    myloc = new google.maps.LatLng(lat, lng);
    map.panTo(myloc);

    pers_loc = new google.maps.Marker({
        position: myloc,
        title: "You are here",
        map: map
    });


    mbtaxhr = new XMLHttpRequest();
    mbtaxhr.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
    mbtaxhr.onreadystatechange = function() {
        if(mbtaxhr.readyState == 4 && mbtaxhr.status == 200) {
            var coords = new Array();
            var red_coords = new Array();

            sched = JSON.parse(mbtaxhr.responseText);

            if (sched["line"] == "blue") {
                for (var i = 0; i < 12; i++) {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])));

                    setMark(parseFloat(stations[i][2]), parseFloat(stations[i][3]), stations[i][1], blueIcon, "blue");
                }

                var Path = new google.maps.Polyline({
                    path: coords,
                    geodesic: true,
                    strokeColor: "#0059FC",
                    strokeOpacity: 1.0,
                    strokeWeight: 8
                });
                Path.setMap(map);
                dist("blue");
            }

            if (sched["line"] == "orange") {
                for (var i = 12; i < 31; i++) {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])));
                    setMark(parseFloat(stations[i][2]), parseFloat(stations[i][3]), stations[i][1], blueIcon, "orange");
                }

                var Path = new google.maps.Polyline({
                    path: coords,
                    geodesic: true,
                    strokeColor: '#FFA500',
                    strokeOpacity: 1.0,
                    strokeWeight: 8
                });

                Path.setMap(map);
                dist("orange");
            }
            
            if (sched["line"] == "red") {
                for (var i = 31; i < 49; i++)   {
                    coords.push(new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])));
                    setMark(parseFloat(stations[i][2]), parseFloat(stations[i][3]), stations[i][1], blueIcon, "red");
                }
                red_coords.push(new google.maps.LatLng(42.320685,-71.052391));
                for (var i = 49; i < 53; i++)   {
                    red_coords.push(new google.maps.LatLng(parseFloat(stations[i][2]),parseFloat(stations[i][3])));
                    setMark(parseFloat(stations[i][2]), parseFloat(stations[i][3]), stations[i][1], blueIcon, "red");
                }

                var Path = new google.maps.Polyline({
                    path: coords,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 8
                });

                var Path2 = new google.maps.Polyline({
                    path: red_coords,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 8
                });
                Path.setMap(map);
                Path2.setMap(map);
                dist("red");
            }
        }
        else if (mbtaxhr.readyState == 4 && mbtaxhr.status == 500) {
            alert("Failure");
        }
        
    };

    mbtaxhr.send("");
}

function tablemake(title) 
{
    var directions = new Array();
    var times = new Array();

    var htmltable = "<p>"+title+"</p><table style='width:200px'><tr><th>Direction</th><th>Time Remaining</th></tr>";

    for (trip in sched["schedule"]) {
        var predictions = sched["schedule"][trip]["Predictions"];

        for (stop in predictions) {
            var whichstop = predictions[stop];
            if (whichstop["Stop"] == title) {
                directions.push(sched["schedule"][trip]["Destination"]);
                times.push(whichstop["Seconds"]);
            }
        }
    }


    for (var i in directions) {
        htmltable = htmltable + "<tr><td>"+directions[i]+"</td><td>"+times[i].toString()+"</td></tr>";
    }

    return htmltable + "</table>";
}

function setMark(lat, lng, title, icon, color) {
    var newmark = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: title,
        icon: icon
    });

    var table = tablemake(title);
    newmark['infoBox'] = new google.maps.InfoWindow({
        content: table
    });
    google.maps.event.addListener(newmark, 'click', function() {
        this['infoBox'].open(map, this);
    });

    if (color == "blue") {
        blue.push(newmark);
    }
    else if (color == "orange") {
        orange.push(newmark)
    }
    else if (color == "red") {
        red.push(newmark);
    }
    
}

function importCSV() 
{

    var request = new XMLHttpRequest();
    request.open("GET", "listofstations.txt", false);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var txt = request.responseText.toString();
            var txtlines = txt.split('\n');
            var hdrs = txtlines[0].split(',');

            var lines = new Array();

            for (var i = 0; i < hdrs.length; i += 4) {
                lines.push([hdrs[i], hdrs[i+1], hdrs[i+2], hdrs[i+3]]);
            }

//            console.log(lines);
            stations = lines;

        }
    };
    request.send("");

}