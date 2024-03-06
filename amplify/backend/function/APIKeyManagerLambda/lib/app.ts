/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_APIKEYDB_ARN
	STORAGE_APIKEYDB_NAME
	STORAGE_APIKEYDB_STREAMARN
Amplify Params - DO NOT EDIT */

import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", function (req, res) {
  // Add your code here
  return res
    .status(200)
    .json({ message: "API Key Manager Online", status: 200 });
});


export default app;
