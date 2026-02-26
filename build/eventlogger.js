
export class EventLogger {
   constructor() {
      var EventLog = []; // Array for holding tuples of eventName and eventTime, to send to server

      const width = window.innerWidth;
      const height = window.innerHeight;

      EventLog.push({windowWidth: width, windowHeight: height});
      
   }

   logEvent(event, time, points) {
      const Event = {
            eventName: event,
            points: points,
            eventTime: time,

      };

      EventLog.push(Event); 
      console.log(`Logged ${Event.eventName} action. Logged at ${Event.eventTime} and has ${Event.points} points`); // Only for testing


   }


}
