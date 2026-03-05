//import fs from 'fs';
//import fs from 'fs';

// MS per frame
const MSPerFrame = 10;

// Clock of total MS since start
var MSClock = 0;

// Counter that increments the clock


//establish iterable stream of the json file


//var filePath = './server/data.json'

//const data = fs.readFileSync(filePath);
//const jsonData = JSON.parse(data);
const jsonData = [{"eventName":"Click","location":"game-start","eventTime":2,"points":0},{"eventName":"ArrowDown","eventTime":157,"points":60},{"eventName":"ArrowLeft","eventTime":170,"points":100},{"eventName":"ArrowDown","eventTime":182,"points":140},{"eventName":"ArrowRight","eventTime":193,"points":180},{"eventName":"ArrowUp","eventTime":222,"points":290},{"eventName":"ArrowLeft","eventTime":230,"points":320},{"eventName":"ArrowUp","eventTime":239,"points":350},{"eventName":"ArrowRight","eventTime":244,"points":370},{"eventName":"ArrowDown","eventTime":270,"points":400},{"eventName":"ArrowLeft","eventTime":281,"points":440},{"eventName":"ArrowDown","eventTime":289,"points":470},{"eventName":"ArrowLeft","eventTime":297,"points":500},{"eventName":"ArrowRight","eventTime":305,"points":520},{"eventName":"Game ended by player","eventTime":602,"points":630,"highscore":"10610"}];

await new Promise(r => setTimeout(r, 5000));
// Infinity loop that dispatches event on the right frame time

var element = jsonData[0];
var nextElement = 1;

setInterval ( function(){MSClock+= MSPerFrame}, MSPerFrame);
setInterval( i => {
    if (element === null) {
        clearInterval(i);
    }
    console.log("in the async loop");
    //jsonData.forEach(e => {
        if ((MSClock / MSPerFrame) === element.eventTime) {
            console.log("in inner time loop");
            switch (element.eventName) {
                case "Click":
                    var event = new MouseEvent("click");
                    document.getElementById(element.location).dispatchEvent(event);
                    break;
                case "ArrowUp":
                    var event = new Event('keydown');
                    event.keyCode = 38;
                    window.dispatchEvent(event); 
                    break;
                case "ArrowDown":
                    var event = new Event('keydown');
                    event.keyCode = 40;
                    window.dispatchEvent(event); 
                    break;
                case "ArrowLeft":
                    var event = new Event('keydown');
                    event.keyCode = 37;
                    window.dispatchEvent(event); 
                    break;
                case "ArrowRight":
                    var event = new Event('keydown');
                    event.keyCode = 39;
                    window.dispatchEvent(event); 
                    break;
            }
            element = jsonData[nextElement];
            nextElement+=1; 
        }
        //await new Promise(r => setTimeout(r, 10));
    //});
}, 10);