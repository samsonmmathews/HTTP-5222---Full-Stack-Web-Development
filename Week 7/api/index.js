import express from "express";
//import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT || "3000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //need this line to be able to receive/parse JSON from request

//allow requests from all domains (need it to deploy API)
//** MUST HAVE THIS IN ORDER FOR API TO WORK WITH REQUESTS FROM ANOTHER WEBSITE **
app.use(cors({
  origin: '*'
}));
//if from a specific domain (e.g. deployed app MAKING requests to this API)
/*
app.use(cors({
  origin: 'https://yourdomain.com'
}));
*/

//API endpoints

/*
 * expect to receive data ?cm=#
 * returns: { length: <converted_val_in_inches> }
 */
// http://localhost:3000/api/convert/cmtoin?cm=10
app.get("/api/convert/cmtoin", (request, response) => {
  let cm = request.query.cm;
  let converted = {
    length: cm / 2.54
  }; //convert cm value to inches
  response.json(converted); //send JSON object with appropriate JSON headers
  //the JSON data to send is in the parentheses
});
/*
 * expect to receive data: ?in=#
 * returns: { length: <converted_val_in_cm> }
 */
app.get("/api/convert/intocm", (req, res) => {
  let inches = req.query.in;
  let converted = {
    length: inches * 2.54
  };
  res.json(converted);
});
//example with POST data
/*
 * expect to receive data { celsius: # }
 * returns: { temperature: <converted_value> }
 */
app.post("/api/convert/ctof", (req, res) => {
  /*
  SEND IN THE BODY
  {
    "celsius": 100
  }
  */
  let celsius = req.body.celsius;
  let convert = (celsius * 9/5) + 32;
  let fahrenheit = {
    temperature: convert
  };
  res.json(fahrenheit);
});
//HTTP server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

