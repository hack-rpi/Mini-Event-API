import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  QueryCommand,
  type GetItemCommandInput,
  type PutItemCommandInput,
  type QueryCommandInput,
  type DeleteItemCommandInput,
  type UpdateItemCommandInput,
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { v4 as uuidv4 } from "uuid";

const REGION = process.env.REGION;

const dbClient = new DynamoDBClient({ region: REGION });

export async function validateApiKey(apiKey: string) {
  const params: QueryCommandInput = {
    TableName: process.env.STORAGE_APIKEYDB_NAME,
    IndexName: "ByAPIKey",
    KeyConditionExpression: "APIKey = :apiKey",
    ExpressionAttributeValues: {
      ":apiKey": { S: apiKey },
    },
    ProjectionExpression: "UserId",
  };

  try {
    const response = await dbClient.send(new QueryCommand(params));
    if (response.Items && response.Items.length > 0) {
      return { status: 200, valid: true, ownerId: response.Items[0].UserId.S };
    } else {
      return { status: 404, valid: false, ownerId: null };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, valid: false };
  }
}

export async function getLists(userId: string, nextToken?: string) {
  const params: QueryCommandInput = {
    TableName: process.env.STORAGE_TODOLISTDB_NAME,
    IndexName: "ByOwnerId",
    KeyConditionExpression: "OwnerId = :ownerId",
    ExpressionAttributeValues: {
      ":ownerId": { S: userId },
    },
    Limit: 10,
    ProjectionExpression: "id, ListName, CreatedAt",
  };

  if (
    nextToken &&
    nextToken !== "null" &&
    nextToken !== "undefined" &&
    nextToken !== ""
  ) {
    params.ExclusiveStartKey = {
      id: { S: nextToken },
    };
  }

  const response = await dbClient.send(new QueryCommand(params));

  if (response.$metadata.httpStatusCode !== 200 || !response.Items) {
    console.log("Issue getting Lists");
    console.error(response);
    return { status: 500, lists: [], nextToken: null };
  }

  let lists = response.Items.map((item) => {
    return {
      id: item.id.S,
      listName: item.ListName.S,
      createdAt: Number(item.CreatedAt.N),
    };
  });

  // Sorts the lists in ascending order by createdAt
  lists = lists.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  let nextTokenResponse = null;
  if (response.LastEvaluatedKey) {
    nextTokenResponse = response.LastEvaluatedKey.id.S;
  }

  return { status: 200, lists, nextToken: nextTokenResponse };
}

export async function createList(userId: string, listName: string) {
  const listId = uuidv4();

  const params: PutItemCommandInput = {
    TableName: process.env.STORAGE_TODOLISTDB_NAME,
    Item: {
      OwnerId: { S: userId },
      ListName: { S: listName },
      id: { S: listId },
      CreatedAt: { N: Date.now().toString() },
    },
  };

  const response = await dbClient.send(new PutItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue creating List");
    console.error(response);
    return { status: 500, list: null };
  }

  return { status: 200, list: { id: listId, listName, createdAt: Date.now() } };
}

export async function getList(listId: string) {
  const params: GetItemCommandInput = {
    TableName: process.env.STORAGE_TODOLISTDB_NAME,
    Key: {
      id: { S: listId },
    },
  };

  const response = await dbClient.send(new GetItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue getting List");
    console.error(response);
    return { status: 500, list: null };
  }

  const list = {
    id: response.Item.id.S,
    listName: response.Item.ListName.S,
    createdAt: Number(response.Item.CreatedAt.N),
    ownerId: response.Item.OwnerId.S,
  };

  return { status: 200, list };
}

export async function deleteList(listId: string) {
  const params: DeleteItemCommandInput = {
    TableName: process.env.STORAGE_TODOLISTDB_NAME,
    Key: {
      id: { S: listId },
    },
    ReturnValues: "ALL_OLD",
  };

  const response = await dbClient.send(new DeleteItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue deleting List");
    console.error(response);
    return { status: 500, list: null };
  }

  const list = {
    id: response.Attributes.id.S,
    listName: response.Attributes.ListName.S,
    createdAt: Number(response.Attributes.CreatedAt.N),
  };

  return { status: 200, list };
}

export async function getListItems(listId: string, nextToken?: string) {
  const params: QueryCommandInput = {
    TableName: process.env.STORAGE_TODOLISTITEMDB_NAME,
    IndexName: "ByListId",
    KeyConditionExpression: "ListId = :listId",
    ExpressionAttributeValues: {
      ":listId": { S: listId },
    },
    Limit: 10,
    ProjectionExpression: "id, ItemName, Checked, CreatedAt",
  };

  if (
    nextToken &&
    nextToken !== "null" &&
    nextToken !== "undefined" &&
    nextToken !== ""
  ) {
    params.ExclusiveStartKey = {
      id: { S: nextToken },
    };
  }

  const response = await dbClient.send(new QueryCommand(params));

  if (response.$metadata.httpStatusCode !== 200 || !response.Items) {
    console.log("Issue getting ListItems");
    console.error(response);
    return { status: 500, listItems: [], nextToken: null };
  }

  let listItems = response.Items.map((item) => {
    return {
      id: item.id.S,
      itemName: item.ItemName.S,
      checked: item.Checked.BOOL,
      createdAt: Number(item.CreatedAt.N),
    };
  });

  // Sorts the list items in ascending order by createdAt
  listItems = listItems.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  let nextTokenResponse = null;
  if (response.LastEvaluatedKey) {
    nextTokenResponse = response.LastEvaluatedKey.id.S;
  }

  return { status: 200, listItems, nextToken: nextTokenResponse };
}

export async function createListItem(
  listId: string,
  itemName: string,
  userId: string
) {
  const itemId = uuidv4();

  const params: PutItemCommandInput = {
    TableName: process.env.STORAGE_TODOLISTITEMDB_NAME,
    Item: {
      ListId: { S: listId },
      ItemName: { S: itemName },
      id: { S: itemId },
      Checked: { BOOL: false },
      CreatedAt: { N: Date.now().toString() },
      OwnerId: { S: userId },
    },
  };

  const response = await dbClient.send(new PutItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue creating ListItem");
    console.error(response);
    return { status: 500, listItem: null };
  }

  return {
    status: 200,
    listItem: { id: itemId, itemName, checked: false, createdAt: Date.now() },
  };
}

export async function getListItem(listItemId: string) {
  const params: GetItemCommandInput = {
    TableName: process.env.STORAGE_TODOLISTITEMDB_NAME,
    Key: {
      id: { S: listItemId },
    },
    AttributesToGet: ["id", "ItemName", "Checked", "CreatedAt", "OwnerId"],
  };

  const response = await dbClient.send(new GetItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue getting ListItem");
    console.error(response);
    return { status: 500, listItem: null };
  }

  const listItem = {
    id: response.Item.id.S,
    itemName: response.Item.ItemName.S,
    checked: response.Item.Checked.BOOL,
    createdAt: Number(response.Item.CreatedAt.N),
    ownerId: response.Item.OwnerId.S,
  };

  return { status: 200, listItem };
}

export async function deleteListItem(listItemId: string) {
  const params: DeleteItemCommandInput = {
    TableName: process.env.STORAGE_TODOLISTITEMDB_NAME,
    Key: {
      id: { S: listItemId },
    },
    ReturnValues: "ALL_OLD",
  };

  const response = await dbClient.send(new DeleteItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue deleting ListItem");
    console.error(response);
    return { status: 500, listItem: null };
  }

  const listItem = {
    id: response.Attributes.id.S,
    itemName: response.Attributes.ItemName.S,
    checked: response.Attributes.Checked.BOOL,
    createdAt: Number(response.Attributes.CreatedAt.N),
  };

  return { status: 200, listItem };
}

export async function bulkDeleteListItems(itemIds: string[]) {
  const requestItems = itemIds.map((id) => {
    return {
      DeleteRequest: {
        Key: {
          id: { S: id },
        },
      },
    };
  });

  const params: BatchWriteItemCommandInput = {
    RequestItems: {
      [process.env.STORAGE_TODOLISTITEMDB_NAME]: requestItems,
    },
  };

  const response = await dbClient.send(new BatchWriteItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200) {
    console.log("Issue bulk deleting ListItems");
    console.error(response);
    return { status: 500, listItems: [] };
  }

  return { status: 200, listItems: itemIds };
}

export async function setChecked(listItemId: string, checked: boolean) {
  const params: UpdateItemCommandInput = {
    TableName: process.env.STORAGE_TODOLISTITEMDB_NAME,
    Key: {
      id: { S: listItemId },
    },
    UpdateExpression: "SET Checked = :checked",
    ExpressionAttributeValues: {
      ":checked": { BOOL: checked },
    },
    ReturnValues: "ALL_NEW",
  };

  const response = await dbClient.send(new UpdateItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200 || !response.Attributes) {
    console.log("Issue setting Checked");
    console.error(response);
    return { status: 500, listItem: null };
  }

  const listItem = {
    id: response.Attributes.id.S,
    itemName: response.Attributes.ItemName.S,
    checked: response.Attributes.Checked.BOOL,
    createdAt: Number(response.Attributes.CreatedAt.N),
  };

  return { status: 200, listItem };
}

export async function renameItem(listItemId: string, newName: string) {
  const params: UpdateItemCommandInput = {
    TableName: process.env.STORAGE_TODOLISTITEMDB_NAME,
    Key: {
      id: { S: listItemId },
    },
    UpdateExpression: "SET ItemName = :itemName",
    ExpressionAttributeValues: {
      ":itemName": { S: newName },
    },
    ReturnValues: "ALL_NEW",
  };

  const response = await dbClient.send(new UpdateItemCommand(params));

  if (response.$metadata.httpStatusCode !== 200 || !response.Attributes) {
    console.log("Issue renaming Item");
    console.error(response);
    return { status: 500, listItem: null };
  }

  const listItem = {
    id: response.Attributes.id.S,
    itemName: response.Attributes.ItemName.S,
    checked: response.Attributes.Checked.BOOL,
    createdAt: Number(response.Attributes.CreatedAt.N),
  };

  return { status: 200, listItem };
}
