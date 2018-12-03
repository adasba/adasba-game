function getChannels(arr, x, y, w, h) {
    return {
        r: arr[(x + w * y) * 4],
        g: arr[(x + w * y) * 4 + 1],
        b: arr[(x + w * y) * 4 + 2],
        a: arr[(x + w * y) * 4 + 3]
    };
}

function imageDataFromImage(img, w, h) {
    var imagecanvas = document.createElement("canvas");
    var imagecontext = imagecanvas.getContext("2d");
    imagecanvas.width = w;
    imagecanvas.height = h;
    imagecontext.drawImage(img, 0, 0);
    return (imagecontext.getImageData(0, 0, w, h));
}

function linesFromImage(img, w, h, l) {
    var lines = [];
    var iLD = [];
    for (var i = 0; l > i; i++) {
        for (var i2 = i * h; (i + 1) * h > i2; i2 += 2) {
            for (var i3 = 0; w > i3; i3 += 2) {
                var px1 = getChannels(img, i3, i2, w, h);
                if (px1.a == 255) {
                    iLD.push({
                        id: px1.r + 256 * px1.g + 65536 * px1.b,
                        start: getChannels(img, i3 + 1, i2, w, h).r,
                        type: getChannels(img, i3, i2 + 1, w, h).r,
                        ray: getChannels(img, i3 + 1, i2 + 1, w, h).r,
                        coords: { x: i3 * 8, y: (i2 - i * h) * 8 }
                    });
                }
            }
        }
    }
    for (var i = 0; iLD.length > i; i++) {
        for (var i2 = 0; iLD.length > i2; i2++) {
            if (i > i2) {
                if (iLD[i].id == iLD[i2].id) {
                    var start;
                    var end;
                    var type;
                    var rayType;
                    if (iLD[i].start == 0) {
                        start = iLD[i].coords;
                        end = iLD[i2].coords;
                    } else {
                        start = iLD[i2].coords;
                        end = iLD[i].coords;                        
                    }
                    if (iLD[i].type == 0) {
                        type = "solid";
                    }
                    if (iLD[i].ray == 0) {
                        rayType = "solid";
                    }
                    lines.push({
                        start: start,
                        end: end,
                        type: type,
                        ray: rayType
                    });
                }
            }
        }
    }
    console.log(lines);
    return lines;
}

function sortLinesByChunk(lines) {
    var lines2 = [];
    var lines3 = [];
    for (var i = 0; lines.length > i; i++) {
        lines3.push([]);
        for (var i2 = 0; lines[i].length > i2; i2++) {
            lines3[i].push([]);
            lines2 = lines2.concat(lines[i][i2]);
        }
    }
    for (var i = 0; lines2.length > i; i++) {
        var coords = {
            x: Math.floor(lines2[i].start.x / 512),
            y: Math.floor(lines2[i].start.y / 512)
        };
        lines3[clamp(coords.y, 0, lines.length)][clamp(coords.x, 0, lines[0].length)].push(lines2[i]);
    }
    return lines3;
}

// var linemap = wsrc("linemap.png");
// // var linec = document.createElement("canvas");
// // var line
// linemap.onload = function() {
//     map.lines[0][0] = linesFromImage(imageDataFromImage(linemap, 102, 408).data, 102, 102, 4);
//     chunks = map.lines[0][0];
//     gameLoop();
// }

map.lines = JSON.parse('[[[{"start":{"x":384,"y":64},"end":{"x":32,"y":63.999999},"type":"solid","ray":"solid"},{"start":{"x":32,"y":64},"end":{"x":32,"y":128},"type":"solid","ray":"solid"},{"start":{"x":32,"y":128},"end":{"x":208,"y":128},"type":"solid","ray":"solid"},{"start":{"x":208,"y":128},"end":{"x":208,"y":208},"type":"solid","ray":"solid"},{"start":{"x":208,"y":208},"end":{"x":528,"y":208},"type":"solid","ray":"solid"},{"start":{"x":528,"y":208},"end":{"x":528,"y":112},"type":"solid","ray":"solid"},{"start":{"x":528,"y":112},"end":{"x":480,"y":112},"type":"solid","ray":"solid"},{"start":{"x":480,"y":112},"end":{"x":480,"y":96},"type":"solid","ray":"solid"},{"start":{"x":480,"y":96},"end":{"x":544,"y":96},"type":"solid","ray":"solid"},{"start":{"x":544,"y":96},"end":{"x":544,"y":128},"type":"solid","ray":"solid"},{"start":{"x":544,"y":128},"end":{"x":608,"y":128},"type":"solid","ray":"solid"},{"start":{"x":384,"y":160},"end":{"x":384,"y":64},"type":"solid","ray":"solid"},{"start":{"x":480,"y":160},"end":{"x":384,"y":160},"type":"solid","ray":"solid"},{"start":{"x":480,"y":144},"end":{"x":480,"y":160},"type":"solid","ray":"solid"},{"start":{"x":432,"y":144},"end":{"x":480,"y":144},"type":"solid","ray":"solid"},{"start":{"x":432,"y":64},"end":{"x":432,"y":144},"type":"solid","ray":"solid"},{"start":{"x":640,"y":64},"end":{"x":432,"y":64},"type":"solid","ray":"solid"},{"start":{"x":640,"y":208},"end":{"x":640,"y":64},"type":"solid","ray":"solid"},{"start":{"x":576,"y":208},"end":{"x":640,"y":208},"type":"solid","ray":"solid"},{"start":{"x":608,"y":128},"end":{"x":608,"y":176},"type":"solid","ray":"solid"},{"start":{"x":608,"y":176},"end":{"x":544,"y":176},"type":"solid","ray":"solid"},{"start":{"x":576,"y":224},"end":{"x":576,"y":208},"type":"solid","ray":"solid"},{"start":{"x":640,"y":224},"end":{"x":576,"y":224},"type":"solid","ray":"solid"},{"start":{"x":640,"y":352},"end":{"x":640,"y":224},"type":"solid","ray":"solid"},{"start":{"x":272,"y":352},"end":{"x":640,"y":352},"type":"solid","ray":"solid"},{"start":{"x":544,"y":176},"end":{"x":544,"y":256},"type":"solid","ray":"solid"},{"start":{"x":544,"y":256},"end":{"x":208,"y":256},"type":"solid","ray":"reflect"},{"start":{"x":576,"y":320},"end":{"x":576,"y":288},"type":"solid","ray":"solid"},{"start":{"x":576,"y":288},"end":{"x":608,"y":288},"type":"solid","ray":"solid"},{"start":{"x":608,"y":288},"end":{"x":608,"y":320},"type":"solid","ray":"solid"},{"start":{"x":608,"y":320},"end":{"x":576,"y":320},"type":"solid","ray":"solid"},{"start":{"x":272,"y":288},"end":{"x":272,"y":352},"type":"solid","ray":"solid"},{"start":{"x":208,"y":256},"end":{"x":208,"y":336},"type":"solid","ray":"solid"},{"start":{"x":256,"y":288},"end":{"x":272,"y":288},"type":"solid","ray":"solid"},{"start":{"x":256,"y":368},"end":{"x":256,"y":288},"type":"solid","ray":"solid"},{"start":{"x":208,"y":336},"end":{"x":160,"y":336},"type":"solid","ray":"solid"},{"start":{"x":160,"y":336},"end":{"x":160,"y":272},"type":"solid","ray":"solid"},{"start":{"x":160,"y":272},"end":{"x":16,"y":272},"type":"solid","ray":"solid"},{"start":{"x":16,"y":272},"end":{"x":16,"y":416},"type":"solid","ray":"solid"},{"start":{"x":192,"y":368},"end":{"x":256,"y":368},"type":"solid","ray":"solid"},{"start":{"x":192,"y":416},"end":{"x":192,"y":368},"type":"solid","ray":"solid"},{"start":{"x":96,"y":416},"end":{"x":192,"y":416},"type":"solid","ray":"solid"},{"start":{"x":80,"y":320},"end":{"x":96,"y":320},"type":"solid","ray":"solid"},{"start":{"x":96,"y":320},"end":{"x":96,"y":416},"type":"solid","ray":"solid"},{"start":{"x":80,"y":416},"end":{"x":80,"y":320},"type":"solid","ray":"solid"},{"start":{"x":16,"y":416},"end":{"x":48,"y":416},"type":"solid","ray":"solid"},{"start":{"x":48,"y":352},"end":{"x":64,"y":352},"type":"solid","ray":"solid"},{"start":{"x":64,"y":352},"end":{"x":64,"y":368},"type":"solid","ray":"solid"},{"start":{"x":64,"y":368},"end":{"x":48,"y":368},"type":"solid","ray":"solid"},{"start":{"x":48,"y":368},"end":{"x":48,"y":352},"type":"solid","ray":"solid"},{"start":{"x":112,"y":368},"end":{"x":128,"y":368},"type":"solid","ray":"solid"},{"start":{"x":128,"y":368},"end":{"x":128,"y":384},"type":"solid","ray":"solid"},{"start":{"x":128,"y":384},"end":{"x":112,"y":384},"type":"solid","ray":"solid"},{"start":{"x":112,"y":384},"end":{"x":112,"y":368},"type":"solid","ray":"solid"},{"start":{"x":48,"y":416},"end":{"x":48,"y":480},"type":"solid","ray":"solid"},{"start":{"x":48,"y":480},"end":{"x":560,"y":480},"type":"solid","ray":"solid"},{"start":{"x":560,"y":480},"end":{"x":560,"y":448},"type":"solid","ray":"solid"},{"start":{"x":560,"y":448},"end":{"x":576,"y":448},"type":"solid","ray":"solid"},{"start":{"x":576,"y":448},"end":{"x":576,"y":496},"type":"solid","ray":"solid"},{"start":{"x":80,"y":432},"end":{"x":80,"y":416},"type":"solid","ray":"solid"},{"start":{"x":208,"y":432},"end":{"x":80,"y":432},"type":"solid","ray":"solid"},{"start":{"x":208,"y":400},"end":{"x":208,"y":432},"type":"solid","ray":"solid"},{"start":{"x":624,"y":400},"end":{"x":208,"y":400},"type":"solid","ray":"solid"},{"start":{"x":624,"y":496},"end":{"x":624,"y":400},"type":"solid","ray":"solid"},{"start":{"x":512,"y":448},"end":{"x":496,"y":448},"type":"solid","ray":"solid"},{"start":{"x":496,"y":448},"end":{"x":496,"y":432},"type":"solid","ray":"solid"},{"start":{"x":496,"y":432},"end":{"x":512,"y":432},"type":"solid","ray":"solid"},{"start":{"x":512,"y":432},"end":{"x":512,"y":448},"type":"solid","ray":"solid"},{"start":{"x":432,"y":448},"end":{"x":416,"y":448},"type":"solid","ray":"solid"},{"start":{"x":416,"y":448},"end":{"x":416,"y":432},"type":"solid","ray":"solid"},{"start":{"x":416,"y":432},"end":{"x":432,"y":432},"type":"solid","ray":"solid"},{"start":{"x":432,"y":432},"end":{"x":432,"y":448},"type":"solid","ray":"solid"},{"start":{"x":352,"y":448},"end":{"x":336,"y":448},"type":"solid","ray":"solid"},{"start":{"x":336,"y":448},"end":{"x":336,"y":432},"type":"solid","ray":"solid"},{"start":{"x":336,"y":432},"end":{"x":352,"y":432},"type":"solid","ray":"solid"},{"start":{"x":352,"y":432},"end":{"x":352,"y":448},"type":"solid","ray":"solid"},{"start":{"x":272,"y":448},"end":{"x":256,"y":448},"type":"solid","ray":"solid"},{"start":{"x":256,"y":448},"end":{"x":256,"y":432},"type":"solid","ray":"solid"},{"start":{"x":256,"y":432},"end":{"x":272,"y":432},"type":"solid","ray":"solid"},{"start":{"x":272,"y":432},"end":{"x":272,"y":448},"type":"solid","ray":"solid"},{"start":{"x":576,"y":496},"end":{"x":576,"y":560},"type":"solid","ray":"solid"},{"start":{"x":576,"y":560},"end":{"x":592,"y":560},"type":"solid","ray":"solid"},{"start":{"x":592,"y":560},"end":{"x":592,"y":576},"type":"solid","ray":"solid"},{"start":{"x":592,"y":576},"end":{"x":400,"y":576},"type":"solid","ray":"solid"},{"start":{"x":400,"y":576},"end":{"x":400,"y":528},"type":"solid","ray":"solid"},{"start":{"x":400,"y":528},"end":{"x":208,"y":528},"type":"solid","ray":"solid"},{"start":{"x":208,"y":528},"end":{"x":208,"y":736},"type":"solid","ray":"solid"},{"start":{"x":208,"y":736},"end":{"x":304,"y":736},"type":"solid","ray":"solid"},{"start":{"x":608,"y":496},"end":{"x":624,"y":496},"type":"solid","ray":"solid"},{"start":{"x":608,"y":512},"end":{"x":608,"y":496},"type":"solid","ray":"solid"},{"start":{"x":624,"y":512},"end":{"x":608,"y":512},"type":"solid","ray":"solid"},{"start":{"x":624,"y":640},"end":{"x":624,"y":512},"type":"solid","ray":"solid"},{"start":{"x":544,"y":640},"end":{"x":624,"y":640},"type":"solid","ray":"solid"},{"start":{"x":544,"y":608},"end":{"x":544,"y":640},"type":"solid","ray":"solid"},{"start":{"x":528,"y":608},"end":{"x":544,"y":608},"type":"solid","ray":"solid"},{"start":{"x":528,"y":640},"end":{"x":528,"y":608},"type":"solid","ray":"solid"},{"start":{"x":480,"y":640},"end":{"x":528,"y":640},"type":"solid","ray":"solid"},{"start":{"x":480,"y":624},"end":{"x":480,"y":640},"type":"solid","ray":"solid"},{"start":{"x":464,"y":624},"end":{"x":480,"y":624},"type":"solid","ray":"solid"},{"start":{"x":464,"y":640},"end":{"x":464,"y":624},"type":"solid","ray":"solid"},{"start":{"x":256,"y":640},"end":{"x":464,"y":640},"type":"solid","ray":"solid"},{"start":{"x":256,"y":688},"end":{"x":256,"y":640},"type":"solid","ray":"solid"},{"start":{"x":336,"y":688},"end":{"x":256,"y":688},"type":"solid","ray":"solid"},{"start":{"x":240,"y":672},"end":{"x":224,"y":672},"type":"solid","ray":"solid"},{"start":{"x":224,"y":672},"end":{"x":224,"y":656},"type":"solid","ray":"solid"},{"start":{"x":224,"y":656},"end":{"x":240,"y":656},"type":"solid","ray":"solid"},{"start":{"x":240,"y":656},"end":{"x":240,"y":672},"type":"solid","ray":"solid"},{"start":{"x":352,"y":688},"end":{"x":336,"y":688},"type":"solid","ray":"solid"},{"start":{"x":352,"y":784},"end":{"x":352,"y":688},"type":"solid","ray":"solid"},{"start":{"x":336,"y":784},"end":{"x":352,"y":784},"type":"solid","ray":"solid"},{"start":{"x":336,"y":800},"end":{"x":336,"y":784},"type":"solid","ray":"solid"},{"start":{"x":352,"y":800},"end":{"x":336,"y":800},"type":"solid","ray":"solid"},{"start":{"x":352,"y":880},"end":{"x":352,"y":800},"type":"solid","ray":"solid"},{"start":{"x":336,"y":880},"end":{"x":352,"y":880},"type":"solid","ray":"solid"},{"start":{"x":336,"y":896},"end":{"x":336,"y":880},"type":"solid","ray":"solid"},{"start":{"x":352,"y":896},"end":{"x":336,"y":896},"type":"solid","ray":"solid"},{"start":{"x":352,"y":976},"end":{"x":352,"y":896},"type":"solid","ray":"solid"},{"start":{"x":336,"y":976},"end":{"x":352,"y":976},"type":"solid","ray":"solid"},{"start":{"x":336,"y":992},"end":{"x":336,"y":976},"type":"solid","ray":"solid"},{"start":{"x":400,"y":992},"end":{"x":336,"y":992},"type":"solid","ray":"solid"},{"start":{"x":400,"y":944},"end":{"x":400,"y":992},"type":"solid","ray":"solid"},{"start":{"x":448,"y":944},"end":{"x":400,"y":944},"type":"solid","ray":"solid"},{"start":{"x":448,"y":928},"end":{"x":448,"y":944},"type":"solid","ray":"solid"},{"start":{"x":400,"y":928},"end":{"x":448,"y":928},"type":"solid","ray":"solid"},{"start":{"x":400,"y":688},"end":{"x":400,"y":928},"type":"solid","ray":"solid"},{"start":{"x":720,"y":688},"end":{"x":400,"y":688},"type":"solid","ray":"solid"},{"start":{"x":304,"y":736},"end":{"x":304,"y":832},"type":"solid","ray":"solid"},{"start":{"x":304,"y":832},"end":{"x":320,"y":832},"type":"solid","ray":"solid"},{"start":{"x":320,"y":832},"end":{"x":320,"y":848},"type":"solid","ray":"solid"},{"start":{"x":320,"y":848},"end":{"x":304,"y":848},"type":"solid","ray":"solid"},{"start":{"x":304,"y":848},"end":{"x":304,"y":928},"type":"solid","ray":"solid"},{"start":{"x":304,"y":928},"end":{"x":320,"y":928},"type":"solid","ray":"solid"},{"start":{"x":320,"y":928},"end":{"x":320,"y":944},"type":"solid","ray":"solid"},{"start":{"x":320,"y":944},"end":{"x":304,"y":944},"type":"solid","ray":"solid"},{"start":{"x":304,"y":944},"end":{"x":304,"y":1024},"type":"solid","ray":"solid"},{"start":{"x":304,"y":1024},"end":{"x":512,"y":1024},"type":"solid","ray":"solid"},{"start":{"x":512,"y":1024},"end":{"x":512,"y":800},"type":"solid","ray":"solid"},{"start":{"x":512,"y":800},"end":{"x":464,"y":800},"type":"solid","ray":"solid"},{"start":{"x":464,"y":800},"end":{"x":464,"y":784},"type":"solid","ray":"solid"},{"start":{"x":464,"y":784},"end":{"x":512,"y":784},"type":"solid","ray":"solid"},{"start":{"x":512,"y":784},"end":{"x":512,"y":736},"type":"solid","ray":"solid"},{"start":{"x":512,"y":736},"end":{"x":720,"y":736},"type":"solid","ray":"solid"},{"start":{"x":720,"y":736},"end":{"x":720,"y":784},"type":"solid","ray":"solid"},{"start":{"x":720,"y":784},"end":{"x":1168,"y":784},"type":"solid","ray":"solid"},{"start":{"x":1168,"y":784},"end":{"x":1168,"y":928},"type":"solid","ray":"solid"},{"start":{"x":1168,"y":928},"end":{"x":1392,"y":928},"type":"solid","ray":"solid"},{"start":{"x":1392,"y":880},"end":{"x":1200,"y":880},"type":"solid","ray":"solid"},{"start":{"x":1200,"y":880},"end":{"x":1200,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1200,"y":848},"end":{"x":1264,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1264,"y":848},"end":{"x":1264,"y":736},"type":"solid","ray":"solid"},{"start":{"x":1264,"y":736},"end":{"x":1088,"y":736},"type":"solid","ray":"solid"},{"start":{"x":1088,"y":736},"end":{"x":1088,"y":704},"type":"solid","ray":"solid"},{"start":{"x":1088,"y":704},"end":{"x":1152,"y":704},"type":"solid","ray":"solid"},{"start":{"x":1152,"y":704},"end":{"x":1152,"y":624},"type":"solid","ray":"solid"},{"start":{"x":1152,"y":624},"end":{"x":1216,"y":624},"type":"solid","ray":"solid"},{"start":{"x":1216,"y":624},"end":{"x":1216,"y":656},"type":"solid","ray":"solid"},{"start":{"x":1216,"y":656},"end":{"x":1392,"y":656},"type":"solid","ray":"solid"},{"start":{"x":1392,"y":576},"end":{"x":1088,"y":576},"type":"solid","ray":"solid"},{"start":{"x":1088,"y":576},"end":{"x":1088,"y":640},"type":"solid","ray":"solid"},{"start":{"x":1088,"y":640},"end":{"x":720,"y":640},"type":"solid","ray":"solid"},{"start":{"x":752,"y":672},"end":{"x":832,"y":672},"type":"solid","ray":"solid"},{"start":{"x":832,"y":672},"end":{"x":832,"y":752},"type":"solid","ray":"solid"},{"start":{"x":832,"y":752},"end":{"x":752,"y":752},"type":"solid","ray":"solid"},{"start":{"x":752,"y":752},"end":{"x":752,"y":672},"type":"solid","ray":"solid"},{"start":{"x":1392,"y":656},"end":{"x":1616,"y":656},"type":"solid","ray":"solid"},{"start":{"x":1616,"y":656},"end":{"x":1616,"y":576},"type":"solid","ray":"solid"},{"start":{"x":1616,"y":576},"end":{"x":1392,"y":576},"type":"solid","ray":"solid"},{"start":{"x":1392,"y":928},"end":{"x":1424,"y":928},"type":"solid","ray":"solid"},{"start":{"x":1424,"y":928},"end":{"x":1424,"y":1088},"type":"solid","ray":"solid"},{"start":{"x":1424,"y":1088},"end":{"x":1200,"y":1088},"type":"solid","ray":"solid"},{"start":{"x":1200,"y":1088},"end":{"x":1200,"y":1200},"type":"solid","ray":"solid"},{"start":{"x":1248,"y":1200},"end":{"x":1248,"y":1136},"type":"solid","ray":"solid"},{"start":{"x":1248,"y":1136},"end":{"x":1680,"y":1136},"type":"solid","ray":"solid"},{"start":{"x":1680,"y":1136},"end":{"x":1680,"y":1216},"type":"solid","ray":"solid"},{"start":{"x":1680,"y":1216},"end":{"x":2000,"y":1216},"type":"solid","ray":"solid"},{"start":{"x":2000,"y":1216},"end":{"x":2000,"y":1008},"type":"solid","ray":"solid"},{"start":{"x":2000,"y":1008},"end":{"x":1680,"y":1008},"type":"solid","ray":"solid"},{"start":{"x":1680,"y":1008},"end":{"x":1680,"y":1088},"type":"solid","ray":"solid"},{"start":{"x":1680,"y":1088},"end":{"x":1472,"y":1088},"type":"solid","ray":"solid"},{"start":{"x":1472,"y":1088},"end":{"x":1472,"y":880},"type":"solid","ray":"solid"},{"start":{"x":1472,"y":880},"end":{"x":1840,"y":880},"type":"solid","ray":"solid"},{"start":{"x":1840,"y":880},"end":{"x":1840,"y":736},"type":"solid","ray":"solid"},{"start":{"x":1840,"y":736},"end":{"x":1424,"y":736},"type":"solid","ray":"solid"},{"start":{"x":1424,"y":736},"end":{"x":1424,"y":880},"type":"solid","ray":"solid"},{"start":{"x":1424,"y":880},"end":{"x":1392,"y":880},"type":"solid","ray":"solid"},{"start":{"x":720,"y":640},"end":{"x":720,"y":688},"type":"solid","ray":"solid"},{"start":{"x":1456,"y":768},"end":{"x":1488,"y":768},"type":"solid","ray":"solid"},{"start":{"x":1488,"y":768},"end":{"x":1488,"y":800},"type":"solid","ray":"solid"},{"start":{"x":1488,"y":800},"end":{"x":1456,"y":800},"type":"solid","ray":"solid"},{"start":{"x":1456,"y":800},"end":{"x":1456,"y":768},"type":"solid","ray":"solid"},{"start":{"x":1520,"y":816},"end":{"x":1552,"y":816},"type":"solid","ray":"solid"},{"start":{"x":1552,"y":816},"end":{"x":1552,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1552,"y":848},"end":{"x":1552,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1552,"y":848},"end":{"x":1520,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1520,"y":848},"end":{"x":1520,"y":816},"type":"solid","ray":"solid"},{"start":{"x":1584,"y":768},"end":{"x":1616,"y":768},"type":"solid","ray":"solid"},{"start":{"x":1616,"y":768},"end":{"x":1616,"y":800},"type":"solid","ray":"solid"},{"start":{"x":1616,"y":800},"end":{"x":1584,"y":800},"type":"solid","ray":"solid"},{"start":{"x":1584,"y":800},"end":{"x":1584,"y":768},"type":"solid","ray":"solid"},{"start":{"x":1648,"y":816},"end":{"x":1680,"y":816},"type":"solid","ray":"solid"},{"start":{"x":1680,"y":816},"end":{"x":1680,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1680,"y":848},"end":{"x":1648,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1648,"y":848},"end":{"x":1648,"y":816},"type":"solid","ray":"solid"},{"start":{"x":1712,"y":768},"end":{"x":1744,"y":768},"type":"solid","ray":"solid"},{"start":{"x":1744,"y":768},"end":{"x":1744,"y":800},"type":"solid","ray":"solid"},{"start":{"x":1744,"y":800},"end":{"x":1712,"y":800},"type":"solid","ray":"solid"},{"start":{"x":1712,"y":800},"end":{"x":1712,"y":768},"type":"solid","ray":"solid"},{"start":{"x":1776,"y":816},"end":{"x":1808,"y":816},"type":"solid","ray":"solid"},{"start":{"x":1808,"y":816},"end":{"x":1808,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1808,"y":848},"end":{"x":1776,"y":848},"type":"solid","ray":"solid"},{"start":{"x":1776,"y":848},"end":{"x":1776,"y":816},"type":"solid","ray":"solid"},{"start":{"x":1200,"y":1200},"end":{"x":1200,"y":1216},"type":"solid","ray":"solid"},{"start":{"x":1200,"y":1216},"end":{"x":736,"y":1216},"type":"solid","ray":"solid"},{"start":{"x":736,"y":1216},"end":{"x":736,"y":1328},"type":"solid","ray":"solid"},{"start":{"x":736,"y":1328},"end":{"x":128,"y":1328},"type":"solid","ray":"solid"},{"start":{"x":128,"y":1328},"end":{"x":128,"y":1664},"type":"solid","ray":"solid"},{"start":{"x":128,"y":1664},"end":{"x":400,"y":1664},"type":"solid","ray":"solid"},{"start":{"x":400,"y":1664},"end":{"x":400,"y":1712},"type":"solid","ray":"solid"},{"start":{"x":400,"y":1712},"end":{"x":432,"y":1712},"type":"solid","ray":"solid"},{"start":{"x":432,"y":1712},"end":{"x":432,"y":1728},"type":"solid","ray":"solid"},{"start":{"x":432,"y":1728},"end":{"x":400,"y":1728},"type":"solid","ray":"solid"},{"start":{"x":400,"y":1728},"end":{"x":400,"y":1792},"type":"solid","ray":"solid"},{"start":{"x":400,"y":1792},"end":{"x":352,"y":1792},"type":"solid","ray":"solid"},{"start":{"x":352,"y":1792},"end":{"x":352,"y":2016},"type":"solid","ray":"solid"},{"start":{"x":496,"y":2016},"end":{"x":496,"y":1792},"type":"solid","ray":"solid"},{"start":{"x":496,"y":1792},"end":{"x":416,"y":1792},"type":"solid","ray":"solid"},{"start":{"x":416,"y":1792},"end":{"x":416,"y":1776},"type":"solid","ray":"solid"},{"start":{"x":416,"y":1776},"end":{"x":448,"y":1776},"type":"solid","ray":"solid"},{"start":{"x":448,"y":1776},"end":{"x":448,"y":1664},"type":"solid","ray":"solid"},{"start":{"x":448,"y":1664},"end":{"x":800,"y":1664},"type":"solid","ray":"solid"},{"start":{"x":800,"y":1664},"end":{"x":800,"y":1600},"type":"solid","ray":"solid"},{"start":{"x":800,"y":1600},"end":{"x":992,"y":1600},"type":"solid","ray":"solid"},{"start":{"x":1040,"y":1616},"end":{"x":1040,"y":1520},"type":"solid","ray":"solid"},{"start":{"x":1040,"y":1520},"end":{"x":672,"y":1520},"type":"solid","ray":"solid"},{"start":{"x":672,"y":1520},"end":{"x":672,"y":1616},"type":"solid","ray":"solid"},{"start":{"x":672,"y":1616},"end":{"x":448,"y":1616},"type":"solid","ray":"solid"},{"start":{"x":448,"y":1616},"end":{"x":448,"y":1536},"type":"solid","ray":"solid"},{"start":{"x":448,"y":1536},"end":{"x":176,"y":1536},"type":"solid","ray":"solid"},{"start":{"x":176,"y":1536},"end":{"x":176,"y":1488},"type":"solid","ray":"solid"},{"start":{"x":176,"y":1488},"end":{"x":576,"y":1488},"type":"solid","ray":"solid"},{"start":{"x":576,"y":1488},"end":{"x":576,"y":1376},"type":"solid","ray":"solid"},{"start":{"x":576,"y":1376},"end":{"x":1024,"y":1376},"type":"solid","ray":"solid"},{"start":{"x":1024,"y":1376},"end":{"x":1024,"y":1264},"type":"solid","ray":"solid"},{"start":{"x":1024,"y":1264},"end":{"x":1248,"y":1264},"type":"solid","ray":"solid"},{"start":{"x":1248,"y":1248},"end":{"x":1248,"y":1200},"type":"solid","ray":"solid"},{"start":{"x":1232,"y":1200},"end":{"x":1232,"y":1216},"type":"solid","ray":"solid"},{"start":{"x":1232,"y":1216},"end":{"x":1216,"y":1216},"type":"solid","ray":"solid"},{"start":{"x":1216,"y":1216},"end":{"x":1216,"y":1200},"type":"solid","ray":"solid"},{"start":{"x":1216,"y":1200},"end":{"x":1232,"y":1200},"type":"solid","ray":"solid"},{"start":{"x":1248,"y":1264},"end":{"x":1248,"y":1248},"type":"solid","ray":"solid"}],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]]]');
//chunks = map.lines[0][0];

map.lines = sortLinesByChunk(map.lines);

setTimeout(function () {
    gameLoop();
}, 1000);