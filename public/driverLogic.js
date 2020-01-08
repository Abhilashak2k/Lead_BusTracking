let bid = "bus";
let socket = null;
let intervalFunction = null;

//Sending to sendServer

function sendServer() {
    console.log("");
    const b_id = document.getElementById("BusNo").value;
    const sid = document.getElementById("ShiftNo").value;
    $.post("/UpdateConductorRouteInfo", {
        BusNo: b_id,
        Shift: sid
    }, function(data) {
        console.log(data);
        document.getElementById("RouteId").innerHTML = "Your Route ID is " + data;
        bid = data;
        socket = io('http://localhost:3600');
    });
}

function sendSMS() {
    const sid = document.getElementById("Sid").value;
    $.post("/FindParentSendNotification", {
        RegNo: sid
    }, function(data) {
        document.getElementById("Sid").value="";
        console.log("Parent to be sent success SMS " + data);
        $.post("/sendsms", {message : "Your child has boarded", tosend:  data}, (successMsg)=>{
          console.log(successMsg + "Message sent!");

        })
    });
}
document.getElementById("journey").addEventListener( "click", ()=> {
    socket.emit('new-user', bid);
    let journeyElement = document.getElementById("journey");
    if(!!journeyElement){
      $("#journey").empty();
      $("#journey").append('<button id = "endJourney" onclick = "endJourney()" >Journey started. End Journey? </button>');
      document.getElementById("journey").id= "endJourney";
      // journeyElement.innerHTML = "Journey Started. End Journey?";
      // journeyElement.id = "endJourney";
      // journeyElement = null;

    let lat, curLat;
    let lang, curLang;
    let dif = 1;

    navigator.geolocation.getCurrentPosition((pos) => {
        lat = curLat = pos.coords.latitude;
        lang = curLang = pos.coords.longitude;
    });

    intervalFunction = setInterval(timer, 1000);

    function timer(){

          curLat+=0.0001;
          curLang+=0.0001;

      console.log(curLat, curLang);
      room = bid;

      let position = {
          lat: curLat,
          lang: curLang,
          room: bid
      }
      socket.emit('getloc', position);

      $("#Presentloc").html(`${curLat} , ${curLang} , ${room}`);
  }

  }
});

function endJourney() {
  document.getElementById("endJourney").innerHTML = "<button>Journey Ended</button>";
  socket.emit('dis-user', bid);
  clearInterval(intervalFunction);
}
