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
import { CognitoJwtVerifier } from "aws-jwt-verify";
import {
  getApiKey,
  createApiKey,
  deleteApiKey,
  refreshApiKey,
} from "./dbActions";

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

const cognitoJwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID as string,
  tokenUse: "access",
  clientId: process.env.COGNITO_CLIENT_ID as string,
});

app.get("/", function (req, res) {
  return res
    .status(200)
    .json({ message: "API Key Manager Online", status: 200 });
});

app.get("/getkey", async function (req, res) {
  const jwt = req.headers.authorization;

  if (!jwt) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No JWT provided", status: 401 });
  }

  try {
    cognitoJwtVerifier.verify(jwt);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid Cognito JWT", status: 401 });
  }

  if (!req.query.userId) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing userId", status: 400 });
  }

  const apiKeyResponse = await getApiKey(req.query.userId as string);

  if (apiKeyResponse.status === 404) {
    const newApiKeyResponse = await createApiKey(req.query.userId as string);
    return res.status(newApiKeyResponse.status).json(newApiKeyResponse);
  }

  return res.status(200).json(apiKeyResponse);
});

app.post("/refreshkey", async function (req, res) {
  const jwt = req.headers.authorization;

  if (!jwt) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No JWT provided", status: 401 });
  }

  try {
    cognitoJwtVerifier.verify(jwt);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid Cognito JWT", status: 401 });
  }

  if (!req.body.userId) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing userId", status: 400 });
  }

  const apiKeyResponse = await refreshApiKey(req.body.userId as string);

  return res.status(apiKeyResponse.status).json(apiKeyResponse);
});

app.delete("/deletekey", async function (req, res) {
  const jwt = req.headers.authorization;

  if (!jwt) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No JWT provided", status: 401 });
  }

  try {
    cognitoJwtVerifier.verify(jwt);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid Cognito JWT", status: 401 });
  }

  if (!req.query.userId) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing userId", status: 400 });
  }

  const apiKeyResponse = await deleteApiKey(req.query.userId as string);

  return res.status(apiKeyResponse.status).json(apiKeyResponse);
});

export default app;
