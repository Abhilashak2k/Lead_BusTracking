let map;
let g_lati, g_lang;
let bid = "bus";
const socket = io('http://localhost:3600');

function start() {
    socket.emit('new-user', bid);
    socket.on('loc', addMessages);
}

function addMessages(message) {
    $("#Presentloc").html('')
    g_lati = message.lat;
    g_lang = message.lang;
    $("#Presentloc").append(`<p> ${message.lat} , ${message.lang} </p>`);
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

            const RouteButton = document.getElementById("RouteButton");
            RouteButton.parentNode.removeChild(RouteButton);

            let html = `<select  id = "DropDown">` +
                `<option selected hidden style='display:none'>Select Childname</option>`;

            data.forEach(element => {
                html += `<option>${element.name}</option>`;
            });

            html = html + `</select><button id="Childname">Submit</button>`;
            console.log(html);
            $("#DropBox").append(html);

            $("#Childname").click(function() {
                let Childname = document.getElementById("DropDown").value;
                console.log("User has Selected the childname " + Childname);
                data.forEach(element => {
                    if (element.name == Childname) {
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

function getMap() {
  $.get("/getMapAPI", (data)=>{
    console.log("************************************");
    console.log(data);
    $("#Presentloc").append(`<img>${data}</img>`);
  })

}
