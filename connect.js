let connected_flag;
var mqtt;
function MQTTconnect(link, porting) {
    var s = link;
    var p = porting;

    if (p != "") {
        port = parseInt(p);
    }
    if (s != "") {
        host = s;
    }
    $(".terminal").text("Connecting to " + host + "on port " + port);
    var x = Math.floor(Math.random() * 10000);
    var cname = "orderform-" + x;

    mqtt = new Paho.MQTT.Client(link, porting, cname);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnected = onConnected;
    mqtt.connect(options);

    return false;
}

function onConnectionLost() {
    console.log("connection lost");
    //document.getElementById("status").innerHTML = "Connection Lost";
    //document.getElementById("messages").innerHTML = "Connection Lost";
    connected_flag = 0;
    if (connected_flag) {
        $(".status").css("background-color", "green");
    } else {
        $(".status").css("background-color", "red");
    }
}

function onConnected(recon, url) {
    console.log(" in onConnected " + reconn);

}
function onFailure(message) {
    console.log("Failed");
    //document.getElementById("messages").innerHTML = "Connection Failed- Retrying";
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    $(".terminal").text("Connected to " + host + "on port " + port);
    //document.getElementById("messages").innerHTML = "Connected to " + host + "on port " + port;
    connected_flag = 1;
    if (connected_flag) {
        $(".status").css("background-color", "green");
    } else {
        $(".status").css("background-color", "red");
    }
    console.log("on Connect " + connected_flag);
    //mqtt.subscribe("sensor1");
    //message = new Paho.MQTT.Message("Hello World");
    //message.destinationName = "sensor1";
    //mqtt.send(message);
    Connected();

}

function sub_topics(stopic) {
    if (connected_flag == 0) {
        return false;
    }
    $(".terminal").text("subscribe "+ stopic);
    mqtt.subscribe(stopic);
    return false;
}
function send_message() {
    //document.getElementById("messages").innerHTML = "";
    if (connected_flag == 0) {
        out_msg = "<b>Not Connected so can't send</b>"
        console.log(out_msg);
    //    document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    //var msg = document.forms["smessage"]["message"].value;
    console.log(msg);

    //var topic = document.forms["smessage"]["Ptopic"].value;
    message = new Paho.MQTT.Message(msg);
    if (topic == "")
        message.destinationName = "test-topic"
    else
        message.destinationName = topic;
    mqtt.send(message);
    return false;
}