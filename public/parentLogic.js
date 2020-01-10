let map;
let g_lati, g_lang;
let bid = "bus";
let flag=0;

var marker;
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
    $("#Presentloc").html('')
    g_lati = message.lat;
    g_lang = message.lang;
    $("#Presentloc").append(`<p> ${message.lat} , ${message.lang} </p>`);

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
    }

    var latlng = new google.maps.LatLng(lati, longi);
  console.log("In initmap function " + lati + longi);

  marker = new google.maps.Marker({
    map:map,
    position:latlng,
    icon:'https://img.icons8.com/color/5/000000/filled-circle.png'
  });

  marker.setMap(map);
    

      var path = poly.getPath();

      var latlng = new google.maps.LatLng(lati, longi);
      marker.setPosition(latlng);
      path.push(latlng);
      poly.setMap(map);

    
}

function getRouteId() {
    let phNo = document.getElementById("PhNo").value;
    $.post("/UpdateParentRouteInfo", {
        PhNo: phNo
    }, (data) => {
        if (data.length == 1) {
            document.getElementById("bid").value = "Your Route ID is " + data[0].route_id;
            bid = data[0].route_id;
        } else if (data.length > 1) {

            const routeButton = document.getElementById("RouteButton");
            routeButton.parentNode.removeChild(routeButton);

            let html = `<select  id = "DropDown">` +
                `<option selected hidden style='display:none'>Select Childname</option>`;

            data.forEach(element => {
                html += `<option>${element.name}</option>`;
            });

            html = html + `</select><button id="Childname">Submit</button>`;
            $("#DropBox").append(html);

            $("#Childname").click(function() {
                let childname = document.getElementById("DropDown").value;
                data.forEach(element => {
                    if (element.name == childname) {
                        document.getElementById("bid").value = "Your Route ID is " + element.route_id;
                        bid = element.route_id;
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

  var lati, longi;
  if( !navigator.geolocation ){
    console.log("Browser has no location access!!");
  }
}

function initMap() {
  longi = g_lang;
  lati = g_lati;

  console.log("Coordinates recieved by map are " + lati + longi);
  
//   marker = new google.maps.Marker({
//     position: latlng,
//     map: map,
//     title: "Bus location!",
    
// });

  
  var marker = new google.maps.Marker({
    map:map,
    position:{lat:lati, lng: longi},
    icon:'https://img.icons8.com/color/5/000000/filled-circle.png'
  });

  marker.setMap(map);


  
//update coords

}


