var config = {
    apiKey: "AIzaSyAzkuVWvV79TILB1ZlrK7foRKlrHksPsNE",
    authDomain: "careml.firebaseapp.com",
    databaseURL: "https://careml.firebaseio.com",
    projectId: "careml",
    storageBucket: "careml.appspot.com",
    messagingSenderId: "893046241267"
};
firebase.initializeApp(config);

var database = firebase.database();

var room = document.getElementById("room");
var leds = [];
var scale = 5;
var roomx = 186;
var roomy = 98;

room.setAttribute('style', 'width: ' + roomx * scale + 'px; height: ' + roomy * scale + 'px;')

for (var i = 0; i < 100; i++) {
    var a = getLocScale(i);
    room.innerHTML += '<div class="led" id="led-' + i + '"></div>';
    var b = document.getElementById('led-' + i);
    b.setAttribute('style', 'left: ' + a.x + 'px; bottom: ' + a.y + 'px;');
    leds.push(b);
}

function getLoc(i) {
    var a = {x: 0, y: 0};
    if (i < 32) {
        a.y = 96;
        a.x = 60 + Math.round(3.937 * i);
    } else if (i < 56) {
        a.x = 184;
        a.y = 95 - Math.round(3.937 * (i - 32));
    } else {
        a.y = 0;
        a.x = 183 - Math.round(3.937 * (i - 56));
    }
    return a;
}

function getLocScale(i) {
    var a = {x: 0, y: 0};
    if (i < 32) {
        a.y = 96;
        a.x = 60 + 3.937 * i;
    } else if (i < 56) {
        a.x = 184;
        a.y = 95 - 3.937 * (i - 32);
    } else {
        a.y = 0;
        a.x = 183 - 3.937 * (i - 56);
    }
    a.x = Math.round(a.x * scale);
    a.y = Math.round(a.y * scale);
    return a;
}

function runScript(e) {
    if (e.keyCode == 13) {
        var tb = document.getElementById("scriptBox");
        tb.value = '';

        const Http = new XMLHttpRequest();
        const url='https://webled-2d7e0.firebaseio.com/data';
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            console.log(Http.responseText)
        }
    }
}