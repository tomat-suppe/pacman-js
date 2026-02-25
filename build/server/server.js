import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Boolean to keep track of whether a gamesession has ended.
var ended = false;

var filePath = './data.json'

// Create a file for saving the json data of the game session.
var file = fs.createWriteStream(filePath, {flags: 'w'});

// Creating JSON object for the file
let fileStart = {
   "gamedata": []
};

// Appending fileStart into the JSON file
fs.writeFileSync(filePath, (JSON.stringify(fileStart)));

// Create a JSON object for appending data when receiving through POST
const data = fs.readFileSync(filePath);
const jsonData = JSON.parse(data);

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
      if (v.eventName === "Session Ended") {ended = true};
      jsonData.gamedata.push(v) });

   try {
      // Write the new JSON data into the file
      fs.writeFileSync(filePath, JSON.stringify(jsonData));
   } catch (e) {
      console.log(`Could not write to file, with error: ${e}`);
   }

   if (ended) {
      file.end();
      console.log("file ended");
   }

   res.json({ status : "ok"});
});
} catch (e) {
   console.log("Post error: " + e);
}