import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  type GetItemCommandInput,
  type QueryCommandInput,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";

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

  const response = await dbClient.send(new QueryCommand(params));

  if (response.Items && response.Items.length > 0) {
    return { status: 200, apiKey: response.Items[0].APIKey.S };
  } else {
    return { status: 404, apiKey: null };
  }
}

export async function createApiKey(userId: string) {
  const apiKey = Math.random().toString(36).substring(2, 15);

  const params = {
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
  const params = {
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
    return response;
  }
  return createApiKey(userId);
}
