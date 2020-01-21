let map;
let g_lati, g_lang;
let bid = "bus";
let flag=0;
{
  var stopCoords = [ [ 72.85085678100586, 19.138843565944068 ], [ 72.85223007202148, 19.139654429519467 ], [ 72.85343170166016, 19.140465289112228 ], [ 72.85497665405273, 19.140465289112228 ], [ 72.8561782836914, 19.141113973918838 ], [ 72.85737991333008, 19.141113973918838 ], [ 72.8584098815918, 19.140465289112228 ], [ 72.85926818847656, 19.140140945753046 ], [ 72.86029815673827, 19.139816601756635 ], [ 72.86149978637695, 19.139816601756635 ], [ 72.86218643188477, 19.139654429519467 ], [ 72.86321640014648, 19.139005738977747 ], [ 72.86424636840819, 19.139005738977747 ], [ 72.86561965942383, 19.139330084567224 ], [ 72.8668212890625, 19.139330084567224 ], [ 72.86802291870117, 19.139816601756635 ], [ 72.86888122558594, 19.139816601756635 ], [ 72.87025451660156, 19.139654429519467 ], [ 72.87094116210938, 19.139167911852134 ], [ 72.87179946899414, 19.13868139275108 ], [ 72.87248611450194, 19.13803269838618 ], [ 72.87351608276367, 19.13754617593991 ], [ 72.87351608276367, 19.136573126746544 ], [ 72.87420272827148, 19.13543789544024 ], [ 72.87437438964844, 19.134627011157416 ], [ 72.8748893737793, 19.133167409414444 ], [ 72.8748893737793, 19.132194334419058 ], [ 72.87557601928711, 19.130572530019965 ], [ 72.87660598754883, 19.12992380380149 ], [ 72.87797927856445, 19.129761621848786 ], [ 72.87918090820312, 19.129761621848786 ], [ 72.88055419921875, 19.129761621848786 ], [ 72.88244247436523, 19.129275075035242 ], [ 72.8839874267578, 19.129437257465653 ], [ 72.88518905639648, 19.129275075035242 ], [ 72.88656234741211, 19.128788526788604 ], [ 72.88793563842772, 19.128301977108908 ], [ 72.88930892944336, 19.127166688950112 ], [ 72.89033889770508, 19.126031392989653 ], [ 72.8917121887207, 19.125220462527317 ], [ 72.89291381835938, 19.124896089227946 ], [ 72.894287109375, 19.12473390233945 ], [ 72.89548873901366, 19.124571715291765 ], [ 72.8968620300293, 19.124085153193505 ], [ 72.89806365966797, 19.122949836059103 ], [ 72.89892196655273, 19.121652321211393 ], [ 72.89960861206055, 19.120516987362755 ], [ 72.89960861206055, 19.12035479617626 ], [ 72.90081024169922, 19.12035479617626 ], [ 72.90201187133789, 19.11986822166177 ], [ 72.90321350097656, 19.11954383785625 ], [ 72.90424346923828, 19.11954383785625 ], [ 72.90596008300781, 19.11986822166177 ], [ 72.90750503540039, 19.121003559967214 ], [ 72.90836334228516, 19.12230107990871 ], [ 72.90853500366211, 19.123760777665353 ], [ 72.90990829467773, 19.124247340718785 ], [ 72.9111099243164, 19.123760777665353 ], [ 72.91299819946289, 19.12392296550902 ], [ 72.91454315185547, 19.124247340718785 ], [ 72.9159164428711, 19.124571715291765 ], [ 72.9166030883789, 19.1258692072156 ], [ 72.91763305664062, 19.12635576406013 ], [ 72.91849136352539, 19.12749105779159 ], [ 72.91934967041016, 19.128626343721265 ], [ 72.92089462280273, 19.128626343721265 ], [ 72.92123794555664, 19.127166688950112 ], [ 72.92192459106445, 19.126031392989653 ], [ 72.92329788208008, 19.126031392989653 ], [ 72.92501449584961, 19.125382648938192 ], [ 72.92655944824219, 19.124896089227946 ], [ 72.92810440063477, 19.124896089227946 ], [ 72.92947769165039, 19.124896089227946 ], [ 72.93153762817383, 19.124896089227946 ], [ 72.93325424194336, 19.12473390233945 ], [ 72.93479919433594, 19.12473390233945 ], [ 72.93617248535156, 19.12473390233945 ], [ 72.93703079223633, 19.12440952808487 ], [ 72.93806076049805, 19.123760777665353 ] ];
}
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
      for (var i = 0; i < stopCoords.length; i+=4) {
        busMarker = new google.maps.Marker({
            map:map,
            position: new google.maps.LatLng(stopCoords[i][1],stopCoords[i][0]),
            icon: "https://img.icons8.com/emoji/15/000000/bus-stop-emoji.png"
        });
        busMarker.setMap(map);

      }

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
    alert("Browser has no location access!!");
  }
}

function initMap() {
  longi = g_lang;
  lati = g_lati;


//   busMarker = new google.maps.Marker({
//     position: latlng,
//     map: map,
//     title: "Bus location!",

// });


  var busMarker = new google.maps.Marker({
    map:map,
    position:{lat:lati, lng: longi},
    icon:'https://img.icons8.com/color/5/000000/filled-circle.png'
  });

  busMarker.setMap(map);



//update coords

}
