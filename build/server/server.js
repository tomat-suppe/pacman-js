import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Boolean to keep track of whether a gamesession has ended.
var ended = false;

//var filePath = './data.json'

// Create a file for saving the json data of the game session.
//var file = fs.createWriteStream(filePath, {flags: 'w'});


// Creating JSON object for the file




// Appending fileStart into the JSON file


// Create a JSON object for appending data when receiving through POST

app.use(cors());

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());


try {
   app.get('/log-data', (req, res) => {
      res.send("nothing to get at log-data")

   })
} catch (e) {
   console.log("Could not get. Error: " + e)
}

try {
app.post('/log-data', (req, res) => {
   // Append received data to the JSON object by iterating over the received array.


   req.body.forEach(function(v) {

      var filePath = v.ID + ".json";

      if (fs.existsSync(filePath)) {

         
         const data = fs.readFileSync(filePath);
         const jsonData = JSON.parse(data);

         jsonData.ID.push(v);
         try {
            // Write the new JSON data into the file
            fs.writeFileSync(filePath, JSON.stringify(jsonData));
         } catch (e) {
            console.log(`Could not write to file, with error: ${e}`);
         }


      }
      else {
         
         fs.createWriteStream(filePath, {flags : 'w'});
                  
         let fileStart = {
            ID : []
         };


         fs.writeFileSync(filePath, (JSON.stringify(fileStart)));
      }
   });
   res.json({ status : "ok"});
});
} catch (e) {
   console.log("Post error: " + e);
}