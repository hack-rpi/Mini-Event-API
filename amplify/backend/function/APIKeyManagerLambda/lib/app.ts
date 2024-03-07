/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_APIKEYDB_ARN
	STORAGE_APIKEYDB_NAME
	STORAGE_APIKEYDB_STREAMARN
  AUTH_MINIEVENTAUTH_USERPOOLID
Amplify Params - DO NOT EDIT */

import * as express from "express";
import * as bodyParser from "body-parser";
import * as awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
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
  tokenUse: "id",
  clientId: process.env.COGNITO_CLIENT_ID as string,
});

/**
 * Extracts the user ID from a JWT token.
 *
 * @param jwt - The JWT token.
 * @returns The user ID extracted from the JWT token.
 */
function getUserId(jwt: string): string {
  const jwtPayload = jwt.split(".")[1];
  const buffer = Buffer.from(jwtPayload, "base64");
  const payload = buffer.toString("utf8");
  const payloadJson = JSON.parse(payload);
  return payloadJson.sub;
}

app.get("/", function (req, res) {
  return res
    .status(200)
    .json({ message: "API Key Manager Online", status: 200 });
});

/**
 * Retrieves the API key for the user associated with the provided JWT token.
 */
app.get("/getKey", async function (req, res) {
  const jwt = req.headers.authorization;

  if (!jwt) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No JWT provided", status: 401 });
  }

  let userId;

  try {
    cognitoJwtVerifier.verify(jwt);
    userId = getUserId(jwt);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid Cognito JWT", status: 401 });
  }

  const apiKeyResponse = await getApiKey(userId);

  if (apiKeyResponse.status === 404) {
    const newApiKeyResponse = await createApiKey(userId);
    return res.status(newApiKeyResponse.status).json(newApiKeyResponse);
  }

  return res.status(200).json(apiKeyResponse);
});

/**
 * Refreshes the API key for the user associated with the provided JWT token.
 */
app.post("/refreshKey", async function (req, res) {
  const jwt = req.headers.authorization;

  if (!jwt) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No JWT provided", status: 401 });
  }

  let userId;

  try {
    cognitoJwtVerifier.verify(jwt);
    userId = getUserId(jwt);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid Cognito JWT", status: 401 });
  }

  const apiKeyResponse = await refreshApiKey(userId);

  return res.status(apiKeyResponse.status).json(apiKeyResponse);
});

/**
 * Deletes the API key for the user associated with the provided JWT token.
 */
app.delete("/deleteKey", async function (req, res) {
  const jwt = req.headers.authorization;

  if (!jwt) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No JWT provided", status: 401 });
  }


  let userId;

  try {
    cognitoJwtVerifier.verify(jwt);
    userId = getUserId(jwt);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid Cognito JWT", status: 401 });
  }

  const apiKeyResponse = await deleteApiKey(userId);

  return res.status(apiKeyResponse.status).json(apiKeyResponse);
});

app.listen(3000, function () {
  console.log("App started");
});

export default app;
