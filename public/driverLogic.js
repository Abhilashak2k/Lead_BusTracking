let bid = "bus";
//Sending to sendServer

function sendServer() {
    const b_id = document.getElementById("BusNo").value;
    const sid = document.getElementById("ShiftNo").value;
    $.post("/UpdateConductorRouteInfo", {
        BusNo: b_id,
        Shift: sid
    }, function(data) {
        console.log(data);
        document.getElementById("RouteId").innerHTML = "Your Route ID is " + data;
        bid = data;
    });
}

function sendSMS() {
    const sid = document.getElementById("Sid").value;
    $.post("/FindParentSendNotification", {
        RegNo: sid
    }, function(data) {
        document.getElementById("Sid").value="";
        console.log("Parent to be sent success SMS " + data);
        $("#butsid").append(`<br><p>${data}</p>`)
    });
}

function start() {
    const socket = io('http://localhost:3600');
    socket.emit('new-user', bid);
    document.getElementById("journey").innerHTML = "Journey Started";


    let lat, curLat;
    let lang, curLang;
    let dif = 1;

    navigator.geolocation.getCurrentPosition((pos) => {
        lat = curLat = pos.coords.latitude;
        lang = curLang = pos.coords.longitude;
    });


    setInterval(function() {

        navigator.geolocation.getCurrentPosition((pos) => {
            // curLat = pos.coords.latitude+dif++;
            // curLang = pos.coords.longitude+dif++;
            curLat++;
            curLang++;
        });

        console.log(curLat, curLang);

        //if (Math.abs(curLat - lat) > 0.001 || Math.abs(curLang - lang) > 0.001) {
        room = bid;

        let position = {
            lat: curLat,
            lang: curLang,
            room: bid
        }
        socket.emit('getloc', position);

        $("#Presentloc").html(`${curLat} , ${curLang} , ${room}`);
        //}

    }, 1000);
}
