import duckdb from '@duckdb/node-api';
import { DuckDBConnection } from '@duckdb/node-api';
import { receivedData } from './server.js';

const connection = await DuckDBConnection.create();
const reader = await connection
.run("create table if not exists EventLog (eventName varchar, location varchar, points bigint, logicalTimeStamp bigint, windowsize json)");

const rows = reader.getRowObjectsJson();

console.log(rows);

setInterval(async() => {
    console.log("data fra DB " + JSON.stringify(receivedData));
    try { 
        connection.runAndReadAll("INSERT INTO EventLog SELECT * from read_json(receivedData)");
    } catch (e) {
        console.log(`Could not DB data with error ${e}`);
    }
}, 5000);


// Create the EventLog table if it doesn't exist