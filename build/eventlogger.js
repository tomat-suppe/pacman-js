export class EventLogger {
   constructor(eventlog) {
      this.EventLog = eventlog; // Array for holding tuples of eventName and eventTime, to send to server
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.EventLog.push({windowWidth: width, windowHeight: height});  
   }

   logEvent(event, time, points) {
      const Event = {
            eventName: event,
            points: points,
            eventTime: time,

      };

      this.EventLog.push(Event); 
      console.log(`Logged ${Event.eventName} action. Logged at ${Event.eventTime} and has ${Event.points} points`); // Only for testing
   }
}
