let map;
let g_lati, g_lang;
let bid = "bus";
let flag=0;
var busMarker, stopMarker;
const socket = io('http://localhost:3600');

var poly;


function start() {
   poly  = new google.maps.Polyline({
    geodesic: true,
    strokeColor: 'blue',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

    socket.emit('new-user', bid);
    socket.on('loc', addMessages);
    socket.on('dis-user', goBackToHomePage);
}

function goBackToHomePage(message) {
  location.reload();
}

function addMessages(message) {
    g_lati = message.lat;
    g_lang = message.lang;

    //Display on map
    longi = g_lang;
    lati = g_lati;
    if(flag==0){
      $(".container").empty();

      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lati, lng:  longi},
        zoom: 13
      });
      flag++;
      $.post('/getallstops', {route_id : bid}, (data)=>{
        for (var i = 0; i < data.length; i+=8) {
          let stopCoords = data[i].split(',');
          stopMarker = new google.maps.Marker({
              map:map,
              position: new google.maps.LatLng(stopCoords[0], stopCoords[1]),
              icon: "https://img.icons8.com/emoji/15/000000/bus-stop-emoji.png"
          });
          stopMarker.setMap(map);

        }
      });


      busMarker = new google.maps.Marker({
        map:map,
        position:latlng,
        icon:'https://img.icons8.com/color/15/000000/bus2.png',
        draggable : true
      });

    }

    var latlng = new google.maps.LatLng(lati, longi);
      busMarker.setPosition(latlng);
      busMarker.setMap(map);

      var path = poly.getPath();

      var latlng = new google.maps.LatLng(lati, longi);
      busMarker.setPosition(latlng);
      path.push(latlng);
      poly.setMap(map);


}

function getRouteId() {
    let phNo = document.getElementById("PhNo").value;
    $.post("/UpdateParentRouteInfo", {
        PhNo: phNo
    }, (data) => {
        if (data.length == 1) {
            bid = data[0].route_id;
            $("#Submit-button").replaceWith('<button id="Submit-button" onclick="start()" >Start receiving location</button>');
        } else if (data.length > 1) {

            let html = `<select  id = "DropDown">` +
                `<option selected hidden style='display:none'>Select Childname</option>`;

            data.forEach(element => {
                html += `<option>${element.name}</option>`;
            });

            html = html + `</select>`;
            $("#DropBox").append(html);
            $("#Submit-button").replaceWith('<button id="Submit-button">Submit childname</button>');
            //to remove onclick = getRouteId from submit button

            $("#Submit-button").click(function() {
                let childname = document.getElementById("DropDown").value;
                data.forEach(element => {
                    if (element.name == childname) {
                        bid = element.route_id;
                        $("#Submit-button").replaceWith('<button id="Submit-button" onclick="start()" >Start receiving location</button>');
                    }
                });
            });

        } else {
            alert("Enter a registered Phone Number");
            document.getElementById("PhNo").value = "";
        }
    })
}

function findLoc() {
  if( !navigator.geolocation ){
    alert("Browser has no location access!!");
  }
}
