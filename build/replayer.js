
//import fs from 'fs';
//import fs from 'fs';

const maxFps = 120;


// MS per frame
const MSPerFrame = 10; // 1000 ms / 60 fps = 16.67 ms per frame


// Counter that increments the clock

var frameId = 0;
//establish iterable stream of the json file


//var filePath = './server/data.json'

//const data = fs.readFileSync(filePath);
//const jsonData = JSON.parse(data);
const jsonData = [{"eventName":"Click","location":"game-start","eventTime":3,"points":0},{"eventName":"ArrowUp","eventTime":468,"points":70},{"eventName":"ArrowLeft","eventTime":579,"points":200},{"eventName":"ArrowUp","eventTime":634,"points":270},{"eventName":"ArrowRight","eventTime":653,"points":290},{"eventName":"ArrowUp","eventTime":694,"points":340},{"eventName":"ArrowRight","eventTime":731,"points":390},{"eventName":"ArrowDown","eventTime":773,"points":440},{"eventName":"ArrowRight","eventTime":812,"points":490},{"eventName":"ArrowUp","eventTime":840,"points":520},{"eventName":"ArrowRight","eventTime":968,"points":620},{"eventName":"Control","eventTime":1619,"points":640},{"eventName":"Game ended by player","eventTime":1635,"points":640,"highscore":"8780"}];
const jsonData2 = [{"eventName":"Click","location":"game-start","eventTime":3,"points":0},{"eventName":"ArrowLeft","eventTime":441,"points":30},{"eventName":"ArrowUp","eventTime":471,"points":70},{"eventName":"ArrowLeft","eventTime":606,"points":220},{"eventName":"ArrowUp","eventTime":656,"points":270},{"eventName":"ArrowRight","eventTime":680,"points":300},{"eventName":"ArrowUp","eventTime":728,"points":350},{"eventName":"ArrowRight","eventTime":761,"points":390},{"eventName":"ArrowDown","eventTime":812,"points":440},{"eventName":"ArrowRight","eventTime":856,"points":490},{"eventName":"ArrowUp","eventTime":880,"points":520},{"eventName":"Game ended by player","eventTime":1650,"points":560,"highscore":"8780"}];
const jsonData3 = [{"eventName":"Click","location":"game-start","eventTime":0,"points":0},{"eventName":"ArrowUp","eventTime":5210,"points":70},{"eventName":"ArrowLeft","eventTime":6518,"points":210},{"eventName":"ArrowUp","eventTime":7007,"points":270},{"eventName":"ArrowRight","eventTime":7227,"points":290},{"eventName":"ArrowUp","eventTime":7681,"points":340},{"eventName":"ArrowRight","eventTime":8046,"points":380},{"eventName":"ArrowDown","eventTime":8620,"points":440},{"eventName":"ArrowRight","eventTime":9053,"points":490},{"eventName":"ArrowUp","eventTime":9254,"points":510},{"eventName":"ArrowRight","eventTime":9754,"points":560},{"eventName":"ArrowDown","eventTime":10146,"points":600},{"eventName":"ArrowUp","eventTime":11207,"points":720},{"eventName":"ArrowLeft","eventTime":12118,"points":720},{"eventName":"ArrowDown","eventTime":12905,"points":720},{"eventName":"ArrowLeft","eventTime":13249,"points":720},{"eventName":"ArrowUp","eventTime":13989,"points":770},{"eventName":"Game ended by player","eventTime":1768,"points":770,"highscore":"8780"}];

await new Promise(r => setTimeout(r, 5000));
// Infinity loop that dispatches event on the right frame time

var element = jsonData[0];
var nextElement = 1;








var start = Date.now();

setInterval( i => {
    if (element === null) {
        clearInterval(i);
    }
    
    if (element != null) {
    //console.log("in the async loop");
    //jsonData.forEach(e => {
        //console.log(`Clock is at ${Date.now() - start} / ${Math.floor((Date.now() - start) / MSPerFrame)} and event time is ${element.eventTime}`);
        //if ((Date.now() - start) >= (element.eventTime * MSPerFrame)) {
        console.log(`Clock is at ${Date.now() - start} and event time is ${element.eventTime}`);
        if (element.eventTime <= Date.now() - start) {
            console.log(`Dispatching ${element.eventName} at time ${element.eventTime} at time ${element.eventTime * MSPerFrame}  or  ${Math.floor((Date.now() - start) / MSPerFrame)}` );
            //console.log("in inner time loop");
            switch (element.eventName) {
                case "Click":
                    var event = new MouseEvent("click");
                    document.getElementById(element.location).dispatchEvent(event);
                    start = Date.now();  // should make it such that its only reset if the event is starting. maybe even just for the fist time.
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

            element = jsonData3[nextElement];
            nextElement+=1; 
            if (nextElement >= jsonData3.length) {
                element = null;
            }
        }


        //await new Promise(r => setTimeout(r, 10));
    //});
    }
}, 10);




