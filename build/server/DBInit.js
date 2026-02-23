import duckdb from '@duckdb/node-api';
import { DuckDBConnection } from '@duckdb/node-api';
import { receivedData } from './Serverapi.js';

const connection = await DuckDBConnection.create();
const reader = await connection.run("create table if not exists EventLog (eventName varchar, location varchar, windowsize json, eventTime bigint)");

const rows = reader.getRowObjectsJson();

console.log(rows);

setInterval(async() => {
    console.log("data fra DB " + JSON.stringify(receivedData));
}, 5000);


// Create the EventLog table if it doesn't exist