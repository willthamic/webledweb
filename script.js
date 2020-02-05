var config = {
    // apiKey: "AIzaSyAzkuVWvV79TILB1ZlrK7foRKlrHksPsNE",
    // authDomain: "careml.firebaseapp.com",
    databaseURL: "webled-2d7e0.firebaseio.com/",
    projectId: "webled-2d7e0",
    // storageBucket: "careml.appspot.com",
    // messagingSenderId: "893046241267"
};
firebase.initializeApp(config);

var database = firebase.database();

var room = document.getElementById("room");
var leds = [];
var scale = 5;
var roomx = 186;
var roomy = 98;

var NUM_LEDS = 100;

var colorName = [ "aliceblue", "amethyst", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plaid", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen" ];
var currentColor = "lightgray";

var state = "color";
var brightness = 1;
var ledspeed = 1;

room.setAttribute('style', 'width: ' + roomx * scale + 'px; height: ' + roomy * scale + 'px;')

for (var i = 0; i < 100; i++) {
    var a = getLocScale(i);
    room.innerHTML += '<div class="led" id="led-' + i + '"></div>';
    var b = document.getElementById('led-' + i);
    b.setAttribute('style', 'left: ' + a.x + 'px; bottom: ' + a.y + 'px;');
    leds.push(b);
}

setInterval(ledCallback, 20);

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
        
        var msg = tb.value.toLowerCase();
        if (msg.startsWith("set lights to ")) {
            msg = msg.substring(14);
            msg = msg.replace(/\s/g, '');

            processMsg(msg);

            firebase.database().ref('data').set({
                current: msg,
            });

            tb.value = '';
        }
    }
}

function processMsg (msg) {
    if (colorName.includes(msg)) {
        state = "color";
        currentColor = msg;
    }
    if (msg == "rainbow")
        state = "rainbow";
    else if (msg == "max" || msg == "maximum") {
        brightness = 1;
    }
}

function ledCallback() {
    var t = new Date();
    // var t = d.getMilliseconds();
    if (state == "color") {
        for (var i = 0; i < NUM_LEDS; i++) {
            $("#led-" + i).css('background-color', currentColor);
        }
    } else if (state == "rainbow") {
        for (var i = 0; i < NUM_LEDS; i++) {
            var hue = ((i * 4 + ledspeed * t * .03) / 256 * 360) % 360;
            hue = Math.floor(hue);
            $("#led-" + i).css('background-color', 'hsl(' + hue + ',100%,50%)');
        }
    }
    // for (var i = 0; i < NUM_LEDS; i++) {
    //     leds[i] *= brightness;
    // }
} // End of timerCallback 