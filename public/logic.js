var map;
function findLoc() {

  var lati, longi;
  if( navigator.geolocation ){
    navigator.geolocation.getCurrentPosition( success );
  }

  function success(position)
  {
    longi = position.coords.longitude;
    lati = position.coords.latitude
    console.log(lati, longi);
    initMap(lati, longi);
  }
}

function initMap(lati, longi) {

  console.log(lati, longi);

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lati, lng:  longi},
    zoom: 18
  });

  var marker = new google.maps.Marker({
    map:map,
    position:{lat:lati, lng: longi},
    icon:'https://img.icons8.com/color/10/000000/filled-circle.png'
  });

  marker.setMap(map);

setInterval(function(){
//update the coordinates

app.post('/isit', (req, res)=>{
  res.send("Yayioooooooooooo");
  lati = req.body.lati;
  longi = req.body.longi;

})

marker = new google.maps.Marker({
    map:map,
    position:{lat:lati, lng: longi},
    icon:'https://img.icons8.com/color/10/000000/filled-circle.png'
  });

  marker.setMap(map);

},3000);
}
