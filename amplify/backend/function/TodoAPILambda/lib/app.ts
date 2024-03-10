/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_APIKEYDB_ARN
	STORAGE_APIKEYDB_NAME
	STORAGE_APIKEYDB_STREAMARN
	STORAGE_LISTDB_ARN
	STORAGE_LISTDB_NAME
	STORAGE_LISTDB_STREAMARN
	STORAGE_LISTITEMDB_ARN
	STORAGE_LISTITEMDB_NAME
	STORAGE_LISTITEMDB_STREAMARN
Amplify Params - DO NOT EDIT */

import * as express from "express";
import * as bodyParser from "body-parser";
import * as awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import {
  createList,
  createListItem,
  deleteList,
  deleteListItem,
  getList,
  getListItem,
  getListItems,
  getLists,
  renameItem,
  setChecked,
  validateApiKey,
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

app.get("/status", async function (req, res) {
  res.status(200).json({ message: "TODO API Online.", status: 200 });
});

app.get("/GetLists", async function (req, res) {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no API Key provided.", status: 401 });
  }

  const apiKeyValidation = await validateApiKey(apiKey);
  if (
    apiKeyValidation.status !== 200 ||
    !apiKeyValidation.valid ||
    !apiKeyValidation.ownerId
  ) {
    return res
      .status(apiKeyValidation.status)
      .json({ message: "Unauthorized, invalid API Key.", status: 401 });
  }

  const nextToken = req.query.nextToken;

  const getListsResponse = await getLists(apiKeyValidation.ownerId, nextToken as string);

  if (getListsResponse.status !== 200) {
    return res.status(getListsResponse.status).json({
      message: "Error getting lists.",
      status: getListsResponse.status,
    });
  }

  return res.status(200).json({
    message: "Lists retrieved.",
    ...getListsResponse,
  });
});

app.post("/AddList", async function (req, res) {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no API Key provided.", status: 401 });
  }

  if (!req.body.listName) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing list name.", status: 400 });
  }

  const apiKeyValidation = await validateApiKey(apiKey);

  if (
    apiKeyValidation.status !== 200 ||
    !apiKeyValidation.valid ||
    !apiKeyValidation.ownerId
  ) {
    return res
      .status(apiKeyValidation.status)
      .json({ message: "Unauthorized, invalid API Key.", status: 401 });
  }

  const createListResponse = await createList(
    apiKeyValidation.ownerId,
    req.body.listName
  );

  if (createListResponse.status !== 200) {
    return res.status(createListResponse.status).json({
      message: "Error creating list.",
      status: createListResponse.status,
    });
  }

  return res.status(200).json({
    message: "List created.",
    ...createListResponse,
  });
});

app.delete("/DeleteList", async function (req, res) {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no API Key provided.", status: 401 });
  }

  const listId = req.query.listId;

  if (!listId) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing listId.", status: 400 });
  }

  const apiKeyValidation = await validateApiKey(apiKey);

  if (
    apiKeyValidation.status !== 200 ||
    !apiKeyValidation.valid ||
    !apiKeyValidation.ownerId
  ) {
    return res
      .status(apiKeyValidation.status)
      .json({ message: "Unauthorized, invalid API Key.", status: 401 });
  }

  const getListResponse = await getList(listId as string);

  if (getListResponse.status !== 200 || !getListResponse.list) {
    return res.status(getListResponse.status).json({
      message: "Error getting list to validate owner.",
      status: getListResponse.status,
    });
  }

  if (getListResponse.list.ownerId !== apiKeyValidation.ownerId) {
    return res.status(403).json({
      message: "Forbidden, list does not belong to user.",
      status: 403,
    });
  }

  // TODO: Delete list items first

  const deleteListResponse = await deleteList(listId as string);

  if (deleteListResponse.status !== 200) {
    return res.status(deleteListResponse.status).json({
      message: "Error deleting list.",
      status: deleteListResponse.status,
    });
  }

  return res
    .status(deleteListResponse.status)
    .json({ ...deleteListResponse, message: "List deleted." });
});

app.get("/GetListItems", async function (req, res) {
  const apiKey = req.headers.authorization;
  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no API Key provided.", status: 401 });
  }

  const listId = req.query.listId;
  if (!listId) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing listId.", status: 400 });
  }

  const apiKeyValidation = await validateApiKey(apiKey);

  if (
    apiKeyValidation.status !== 200 ||
    !apiKeyValidation.valid ||
    !apiKeyValidation.ownerId
  ) {
    return res
      .status(apiKeyValidation.status)
      .json({ message: "Unauthorized, invalid API Key.", status: 401 });
  }

  const getListResponse = await getList(listId as string);
  if (getListResponse.status !== 200 || !getListResponse.list) {
    return res.status(getListResponse.status).json({
      message: "Error getting list to validate owner.",
      status: getListResponse.status,
    });
  }

  if (getListResponse.list.ownerId !== apiKeyValidation.ownerId) {
    return res.status(403).json({
      message: "Forbidden, list does not belong to user.",
      status: 403,
    });
  }

  const nextToken = req.query.nextToken;

  const getListItemsResponse = await getListItems(listId as string, nextToken as string);

  if (getListItemsResponse.status !== 200) {
    return res.status(getListItemsResponse.status).json({
      message: "Error getting list items.",
      status: getListItemsResponse.status,
    });
  }

  return res.status(200).json({
    message: "List items retrieved.",
    ...getListItemsResponse,
  });
});

app.post("/AddListItem", async function (req, res) {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no API Key provided.", status: 401 });
  }

  const listId = req.body.listId;

  if (!listId) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing listId.", status: 400 });
  }
  
  const listItem = req.body.itemName;

  if (!listItem) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing item name.", status: 400 });
  }
  const apiKeyValidation = await validateApiKey(apiKey);

  if (
    apiKeyValidation.status !== 200 ||
    !apiKeyValidation.valid ||
    !apiKeyValidation.ownerId
  ) {
    return res
    .status(apiKeyValidation.status)
    .json({ message: "Unauthorized, invalid API Key.", status: 401 });
  }

  const getListResponse = await getList(listId);

  if (getListResponse.status !== 200 || !getListResponse.list) {
    return res.status(getListResponse.status).json({
      message: "Error getting list to validate owner.",
      status: getListResponse.status,
    });
  }
  
  if (getListResponse.list.ownerId !== apiKeyValidation.ownerId) {
    return res.status(403).json({
      message: "Forbidden, list does not belong to user.",
      status: 403,
    });
  }


  const addListItemResponse = await createListItem(
    listId,
    listItem,
    apiKeyValidation.ownerId
  );

  if (addListItemResponse.status !== 200) {
    return res.status(addListItemResponse.status).json({
      message: "Error adding list item.",
      status: addListItemResponse.status,
    });
  }

  return res.status(200).json({
    message: "List item added.",
    ...addListItemResponse,
  });
});

app.delete("/DeleteListItem", async function (req, res) {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no API Key provided.", status: 401 });
  }

  const listItemId = req.query.itemId;

  if (!listItemId) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing list item id.", status: 400 });
  }

  const apiKeyValidation = await validateApiKey(apiKey);

  if (
    apiKeyValidation.status !== 200 ||
    !apiKeyValidation.valid ||
    !apiKeyValidation.ownerId
  ) {
    return res
      .status(apiKeyValidation.status)
      .json({ message: "Unauthorized, invalid API Key.", status: 401 });
  }

  const getListItemResponse = await getListItem(listItemId as string);

  if (getListItemResponse.status !== 200 || !getListItemResponse.listItem) {
    return res.status(getListItemResponse.status).json({
      message: "Error getting list item to verify owner.",
      status: getListItemResponse.status,
    });
  }

  if (getListItemResponse.listItem.ownerId !== apiKeyValidation.ownerId) {
    return res.status(403).json({
      message: "Forbidden, list item does not belong to user.",
      status: 403,
    });
  }

  const deleteListItemResponse = await deleteListItem(listItemId as string);

  if (deleteListItemResponse.status !== 200) {
    return res.status(deleteListItemResponse.status).json({
      message: "Error deleting list item.",
      status: deleteListItemResponse.status,
    });
  }

  return res
    .status(deleteListItemResponse.status)
    .json({ ...deleteListItemResponse, message: "List item deleted." });
});

app.put("/SetChecked", async function (req, res) {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no API Key provided.", status: 401 });
  }

  const listItemId = req.query.itemId;

  if (!listItemId) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing list item id.", status: 400 });
  }

  const apiKeyValidation = await validateApiKey(apiKey);

  if (
    apiKeyValidation.status !== 200 ||
    !apiKeyValidation.valid ||
    !apiKeyValidation.ownerId
  ) {
    return res
      .status(apiKeyValidation.status)
      .json({ message: "Unauthorized, invalid API Key.", status: 401 });
  }

  const getListItemResponse = await getListItem(listItemId as string);

  if (getListItemResponse.status !== 200 || !getListItemResponse.listItem) {
    return res.status(getListItemResponse.status).json({
      message: "Error getting list item to verify owner.",
      status: getListItemResponse.status,
    });
  }

  if (getListItemResponse.listItem.ownerId !== apiKeyValidation.ownerId) {
    return res.status(403).json({
      message: "Forbidden, list item does not belong to user.",
      status: 403,
    });
  }

  const checked = req.query.checked === "true";

  const setCheckedResponse = await setChecked(listItemId as string, checked);

  if (setCheckedResponse.status !== 200) {
    return res.status(setCheckedResponse.status).json({
      message: "Error setting list item checked status.",
      status: setCheckedResponse.status,
    });
  }

  return res
    .status(200)
    .json({ ...setCheckedResponse, message: "List item checked status set." });
});

app.put("/RenameItem", async function (req, res) {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no API Key provided.", status: 401 });
  }

  const listItemId = req.query.itemId as string;

  if (!listItemId) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing list item id.", status: 400 });
  }

  const newName = req.query.newItemName;

  if (!newName) {
    return res
      .status(400)
      .json({ message: "Bad Request, missing new name.", status: 400 });
  }


  const apiKeyValidation = await validateApiKey(apiKey);

  if (
    apiKeyValidation.status !== 200 ||
    !apiKeyValidation.valid ||
    !apiKeyValidation.ownerId
  ) {
    return res
      .status(apiKeyValidation.status)
      .json({ message: "Unauthorized, invalid API Key.", status: 401 });
  }

  const getListItemResponse = await getListItem(listItemId);

  if (getListItemResponse.status !== 200 || !getListItemResponse.listItem) {
    return res.status(getListItemResponse.status).json({
      message: "Error getting list item to verify owner.",
      status: getListItemResponse.status,
    });
  }

  if (getListItemResponse.listItem.ownerId !== apiKeyValidation.ownerId) {
    return res.status(403).json({
      message: "Forbidden, list item does not belong to user.",
      status: 403,
    });
  }

  const renameItemResponse = await renameItem(listItemId, newName as string);

  if (renameItemResponse.status !== 200) {
    return res.status(renameItemResponse.status).json({
      message: "Error renaming list item.",
      status: renameItemResponse.status,
    });
  }

  return res
    .status(200)
    .json({ ...renameItemResponse, message: "List item renamed." });
});

app.listen(3000, function () {
  console.log("App started");
});

export default app;
