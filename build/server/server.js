import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;
let key = 0;

app.use(cors());

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

/* Receive post data. */
try {
   app.post('/log-data', (req, res) => {

      // Iterate over every event from the received array 
      req.body.forEach(function(v) {
         // Create string filepath associated with the event.
         var filePath = "./" + v.ID + ".json";

         // If the file for the session exists, write to it. Else create the file.
         if (!fs.existsSync(filePath)) {
            try {
               var file = fs.createWriteStream(filePath, {flags: 'w'});
               file.write("{", err => (console.log("is this the null problem? could not write " + err)));
            } catch (e) {
               console.log("Could not create file with error: " + e);
            }
         }
            // If event ends a session, write the final } to the file and close it.
         if (v.eventName === "Session ended") {
            // "key" : {eventinformation} }
            let data = "\"" + key + "\":" + JSON.stringify(v) + "}";
            key++;

            fs.writeFileSync(filePath, data, {flag: "a+"});
         } else {

            try {
               // String for the new file data of form: "key" : {eventdata}
               let data = "\"" + key + "\":" + JSON.stringify(v) + ",";
               key++;

               fs.writeFileSync(filePath, data, {flag: "a+"});
            } catch (e) {
               console.log(`Could not write to file, with error: ${e}`);
            }
         }   
      });
      
      res.json({ status : "ok"});
   });
} catch (e) {
   console.log("Post error: " + e);
}