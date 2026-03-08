
//import fs from 'fs';
//import fs from 'fs';

// MS per frame
const MSPerFrame = 10;

// Clock of total MS since start
var MSClock = 0;

// Counter that increments the clock

var frameId = 0;
//establish iterable stream of the json file


//var filePath = './server/data.json'

//const data = fs.readFileSync(filePath);
//const jsonData = JSON.parse(data);
const jsonData = [{"eventName":"Click","location":"game-start","eventTime":2,"points":0},{"eventName":"ArrowDown","eventTime":157,"points":60},{"eventName":"ArrowLeft","eventTime":170,"points":100},{"eventName":"ArrowDown","eventTime":182,"points":140},{"eventName":"ArrowRight","eventTime":193,"points":180},{"eventName":"ArrowUp","eventTime":222,"points":290},{"eventName":"ArrowLeft","eventTime":230,"points":320},{"eventName":"ArrowUp","eventTime":239,"points":350},{"eventName":"ArrowRight","eventTime":244,"points":370},{"eventName":"ArrowDown","eventTime":270,"points":400},{"eventName":"ArrowLeft","eventTime":281,"points":440},{"eventName":"ArrowDown","eventTime":289,"points":470},{"eventName":"ArrowLeft","eventTime":297,"points":500},{"eventName":"ArrowRight","eventTime":305,"points":520},{"eventName":"Game ended by player","eventTime":602,"points":630,"highscore":"10610"}];
const jsonData2 = [{"eventName":"Click","location":"game-start","eventTime":3,"points":0},{"eventName":"ArrowLeft","eventTime":441,"points":30},{"eventName":"ArrowUp","eventTime":471,"points":70},{"eventName":"ArrowLeft","eventTime":606,"points":220},{"eventName":"ArrowUp","eventTime":656,"points":270},{"eventName":"ArrowRight","eventTime":680,"points":300},{"eventName":"ArrowUp","eventTime":728,"points":350},{"eventName":"ArrowRight","eventTime":761,"points":390},{"eventName":"ArrowDown","eventTime":812,"points":440},{"eventName":"ArrowRight","eventTime":856,"points":490},{"eventName":"ArrowUp","eventTime":880,"points":520},{"eventName":"Game ended by player","eventTime":1650,"points":560,"highscore":"8780"}];
await new Promise(r => setTimeout(r, 5000));
// Infinity loop that dispatches event on the right frame time

var element = jsonData2[0];
var nextElement = 1;

var start = Date.now();

setInterval ( function(){MSClock+= MSPerFrame}, MSPerFrame);
setInterval( i => {
    if (element === null) {
        clearInterval(i);
    }
    
    if (element != null) {
    //console.log("in the async loop");
    //jsonData.forEach(e => {
        //console.log(`Clock is at ${Date.now() - start} / ${Math.floor((Date.now() - start) / MSPerFrame)} and event time is ${element.eventTime}`);
        if ((Date.now() - start) >= (element.eventTime * MSPerFrame)) {
        //if (element.eventTime <= frameId) {
            console.log(`Dispatching ${element.eventName} at time ${element.eventTime} at time ${element.eventTime * MSPerFrame}  or  ${Math.floor((Date.now() - start) / MSPerFrame)}` );
            //console.log("in inner time loop");
            switch (element.eventName) {
                case "Click":
                    var event = new MouseEvent("click");
                    document.getElementById(element.location).dispatchEvent(event);
                    start = Date.now() + 4000;  // should make it such that its only reset if the event is starting. maybe even just for the fist time.
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

            element = jsonData2[nextElement];
            nextElement+=1; 
            if (nextElement >= jsonData2.length) {
                element = null;
            }
        }


        //await new Promise(r => setTimeout(r, 10));
    //});
    }
}, 10);




