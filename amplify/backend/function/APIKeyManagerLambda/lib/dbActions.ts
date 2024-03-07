import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  type GetItemCommandInput,
  type PutItemCommandInput,
  type DeleteItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import * as crypto from "crypto";

const REGION = process.env.REGION;
const APIKEY_TABLE_NAME = process.env.STORAGE_APIKEYDB_NAME;

const dbClient = new DynamoDBClient({ region: REGION });

export async function getApiKey(userId: string) {
  const params: GetItemCommandInput = {
    TableName: APIKEY_TABLE_NAME,
    Key: {
      UserId: { S: userId },
    },
    ProjectionExpression: "UserId, APIKey",
  };

  const response = await dbClient.send(new GetItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue getting API Key");
    console.error(response);
    return { status: 500, apiKey: null };
  }

  if (!response.Item) {
    return { status: 404, apiKey: null };
  }

  return { status: 200, apiKey: response.Item.APIKey.S };
}

export async function createApiKey(userId: string) {
  const apiKey = crypto.randomBytes(16).toString("hex");

  const params: PutItemCommandInput = {
    TableName: APIKEY_TABLE_NAME,
    Item: {
      UserId: { S: userId },
      APIKey: { S: apiKey },
    },
  };

  const response = await dbClient.send(new PutItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue creating API Key");
    console.error(response);
    return { status: 500, apiKey: null };
  }

  return { status: 200, apiKey: apiKey };
}

export async function deleteApiKey(userId: string) {
  const params: DeleteItemCommandInput = {
    TableName: APIKEY_TABLE_NAME,
    Key: {
      UserId: { S: userId },
    },
  };

  const response = await dbClient.send(new DeleteItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue deleting API Key");
    console.error(response);
    return { status: 500 };
  }

  return { status: 204 };
}

export async function refreshApiKey(userId: string) {
  const response = await deleteApiKey(userId);
  if (response.status !== 204) {
    return {...response, apiKey: null};
  }
  return createApiKey(userId);
}
