import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;

//export var receivedData = {};

var file = fs.createWriteStream('./data.json', {flags: 'w'});

let fileStart = {
   "gamedata": []
};

fs.writeFileSync('./data.json', (JSON.stringify(fileStart)));

const data = fs.readFileSync('./data.json');
const jsonData = JSON.parse(data);

app.use(cors());

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());


//Curl command for get request: curl localhost:3000/log-data
try {
   app.get('/log-data', (req, res) => {
      res.send("nothing to get at log-data")

   })
} catch (e) {
   console.log("Could not get. Error: " + e)
}

//Curl command for test post request: curl -d "key1=value&key2=value2" localhost:3000/log-data
try {
app.post('/log-data', (req, res) => {
   //receivedData = Object.assign(receivedData, req.body);
   //console.log(receivedData);
   jsonData.gamedata.push(JSON.stringify(req.body));
   var written = fs.writeFileSync('./data.json', JSON.stringify(jsonData));
   //var written = file.write(JSON.stringify(req.body) + "\n"); //<-- the place to test
   if (!written){
      console.log("write error");
   }

   res.json({ status : "ok"});
});
} catch (e) {
   console.log("Post error: " + e);
}

