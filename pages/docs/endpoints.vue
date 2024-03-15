<template>
  <div
    class="w-11/12 h-[calc(100vh-10rem)] flex items-start justify-start flex-col overflow-y-auto"
  >
    <div class="w-full flex flex-col">
      <!-- Status -->
      <div id="status" class="flex flex-col w-full items-start justify-center">
        <h1 class="text-3xl font-bold w-fit mb-2">status (GET)</h1>
        <p>
          This endpoint is used to check if the API is up and running. It
          returns a simple JSON response with the status of the API.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md"> request: {} </code>
              <p>
                This endpoint does not require any parameters. You can simply
                make a GET request to the endpoint to check the status of the
                API.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left"
                >{{
                  `response: { 
    status: 200, 
    message: "API is up and running"
}`
                }}</code
              >
              <p>
                The response will be a JSON object with a status of 200 and a
                message indicating that the API is up and running. A status of
                500 indicates that the API is down.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- GetLists -->
      <div
        id="GetLists"
        class="flex flex-col w-full items-start justify-center"
      >
        <h1 class="text-3xl font-bold w-fit mb-2">GetLists (GET)</h1>
        <p>
          This endpoints returns 25 of the lists owned by by the owner of the
          API key. The lists are returned in the order of creation, with the
          oldest list being the first in the list. If there are no lists, the
          response will be an empty array. <br />
          The response is paginated, with a maximum of 25 lists per page, if
          there are more than 25 lists, the response nextToken will be non-null.
          <br />
          If the nextToken is provided in the request, the response will contain
          the next 25 lists after the list with the nextToken. If the nextToken
          is not provided, the response will contain the first 25 lists.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md whitespace-pre">
                {{
                  `request: {
    headers: {
      authorization: String
    },
    queryStringParameters: {
      nextToken: String | NULL
    },
}`
                }}
              </code>
              <p>
                This endpoint requires the API key to be passed in the
                authorization header. The nextToken is optional and can be used
                to fetch the next 25 lists after the list with the nextToken.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left"
                >{{
                  `response: { 
    status: 200 | 401 | 502, 
    message: "Lists Retrieved" | Error Message,
    lists: List[],
    nextToken: String | NULL
}`
                }}</code
              >
              <ul class="list-disc list-inside">
                <li>
                  A status of 200 and a message indicating that the lists have
                  been retrieved. The lists will be an array of
                  <a href="/docs/types/#List" class="underline text-blue-400"
                    >List</a
                  >
                  objects.
                </li>
                <li>
                  The nextToken will be non-null if there are more lists to be
                  fetched.
                </li>

                <li>
                  A status of 401 indicates that the API key is invalid or
                  missing.
                </li>
                <li>
                  A status of 502 indicates that there was an error with the
                  API.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Add List -->
      <div id="AddList" class="flex flex-col w-full items-start justify-center">
        <h1 class="text-3xl font-bold w-fit mb-2">AddList (POST)</h1>
        <p>
          This endpoint is used to add a new list to the database. The request
          body should contain the name of the list. The response will contain
          the newly created list object.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md whitespace-pre">
                {{
                  `request: {
    headers: {
      authorization: String
    },
    body: {
      listName: String 
    },
}`
                }}
              </code>
              <p>
                This endpoint requires the API key to be passed in the
                authorization header. The request body should contain the name
                of the list.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left"
                >{{
                  `response: { 
    status: 200 | 400 | 401 | 502, 
    message: "List Created." | Error Message,
    list: List,
}`
                }}</code
              >
              <ul class="list-disc list-inside">
                <li>
                  A status of 200 and a message indicating that the list has
                  been created. The list will be a
                  <a href="/docs/types/#List" class="underline text-blue-400"
                    >List</a
                  >
                  object that contains the data for the new list.
                </li>
                <li>
                  A status of 400 indicates that some required parameters are
                  missing.
                </li>
                <li>
                  A status of 401 indicates that the API key is invalid or
                  missing.
                </li>
                <li>
                  A status of 502 indicates that there was an error with the
                  API.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- DeleteList -->
      <div
        id="DeleteList"
        class="flex flex-col w-full items-start justify-center"
      >
        <h1 class="text-3xl font-bold w-fit mb-2">DeleteList (DELETE)</h1>
        <p>
          This endpoint is used to delete a list and all of the respective list
          items from the database. The request body should contain the id of the
          list to be deleted. The response will contain a message indicating
          that the list has been deleted and the list that was deleted.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md whitespace-pre">
                {{
                  `request: {
    headers: {
      authorization: String
    },
    queryStringParameters: {
      listId: String 
    },
}`
                }}
              </code>
              <p>
                This endpoint requires the API key to be passed in the
                authorization header. The query parameters should contain the id
                of the list to be deleted.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-scroll"
                >{{
                  `response: { 
    status: 200 | 400 | 401 | 403 | 404 | 502, 
    message: "List Deleted." | Error Message,
    list: List | NULL,
}`
                }}</code
              >
              <ul class="list-disc list-inside">
                <li>
                  A status of 200 indicates that the list and its list items has
                  been deleted. The list will be a
                  <a href="/docs/types/#List" class="underline text-blue-400"
                    >List</a
                  >
                  object representing the deleted list.
                </li>
                <li>A status of 400 indicates that the listId is missing.</li>
                <li>
                  A status of 401 indicates that the API key is invalid or
                  missing.
                </li>
                <li>
                  A status of 403 indicates that the list does not belong to the
                  user.
                </li>
                <li>A status of 404 indicates that the list does not exist.</li>
                <li>
                  A status of 502 indicates that there was an error with the
                  API.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- GetListItems -->
      <div
        id="GetListItems"
        class="flex flex-col w-full items-start justify-center"
      >
        <h1 class="text-3xl font-bold w-fit mb-2">GetListItems (GET)</h1>
        <p>
          This endpoint is used to get the items in a list. The request query
          parameters should contain the id of the list. The maximum number of
          items returned is 25. The response will contain the items in the list
          and the nextToken if there are more items to be fetched.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md whitespace-pre">
                {{
                  `request: {
    headers: {
      authorization: String
    },
    queryStringParameters: {
      listId: String,
      nextToken: String | NULL
    },
}`
                }}
              </code>
              <p>
                This endpoint requires the API key to be passed in the
                authorization header. The query parameters should contain the id
                of the list to fetch the items from. The nextToken is optional
                and can be used to fetch the next 25 items after the item with
                the nextToken.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-scroll"
                >{{
                  `response: { 
    status: 200 | 400 | 401 | 403 | 404 | 502, 
    message: "List Items Retrieved" | Error Message,
    listItems: ListItem[],
    nextToken: String | NULL
}`
                }}</code
              >
              <ul class="list-disc list-inside">
                <li>
                  A status of 200 indicates that the list items have been
                  retrieved. The listItems will be an array of
                  <a href="/docs/types#ListItem" class="underline text-blue-400"
                    >ListItem</a
                  >
                  objects. The nextToken will be non-null if there are more
                  items to be fetched.
                </li>
                <li>A status of 400 indicates that the listId is missing.</li>
                <li>
                  A status of 401 indicates that the API key is invalid or
                  missing.
                </li>
                <li>
                  A status of 403 indicates that the list does not belong to the
                  user.
                </li>
                <li>A status of 404 indicates that the list does not exist.</li>
                <li>
                  A status of 502 indicates that there was an error with the
                  API.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- AddListItem -->
      <div
        id="AddListItem"
        class="flex flex-col w-full items-start justify-center"
      >
        <h1 class="text-3xl font-bold w-fit mb-2">AddListItem (POST)</h1>
        <p>
          This endpoint is used to add a new item to a list. The request body
          should contain the id of the list and the name of the item. The
          response will contain the newly created list item object.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md whitespace-pre">
                {{
                  `request: {
    headers: {
      authorization: String
    },
    body: {
      listId: String,
      itemName: String
    },
}`
                }}
              </code>
              <p>
                This endpoint requires the API key to be passed in the
                authorization header. The request body should contain the id of
                the list and the name of the item.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-scroll"
                >{{
                  `response: { 
    status: 200 | 400 | 401 | 403 | 404 | 502, 
    message: "List Item Created" | Error Message,
    listItem: ListItem,
}`
                }}</code
              >
              <ul class="list-disc list-inside">
                <li>
                  A status of 200 indicates that the list item has been added.
                  The listItem will be a
                  <a href="/docs/types#ListItem" class="underline text-blue-400"
                    >ListItem</a
                  >
                  object.
                </li>
                <li>
                  A status of 400 indicates that the listId or itemName is
                  missing.
                </li>
                <li>
                  A status of 401 indicates that the API key is invalid or
                  missing.
                </li>
                <li>
                  A status of 403 indicates that the list does not belong to the
                  user.
                </li>
                <li>A status of 404 indicates that the list does not exist.</li>
                <li>
                  A status of 502 indicates that there was an error with the
                  API.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- SetChecked -->
      <div
        id="SetChecked"
        class="flex flex-col w-full items-start justify-center"
      >
        <h1 class="text-3xl font-bold w-fit mb-2">SetChecked (PUT)</h1>
        <p>
          This endpoint is used to set the checked status of a list item. The
          request query strings should contain the id of the list item and the
          checked status. The response will contain the updated list item
          object.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md whitespace-pre">
                {{
                  `request: {
    headers: {
      authorization: String
    },
    body: {
      itemId: String,
      checked: Boolean
    },
}`
                }}
              </code>
              <p>
                This endpoint requires the API key to be passed in the
                authorization header. The request body should contain the id of
                the list item and the checked status.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-scroll"
                >{{
                  `response: { 
    status: 200 | 400 | 401 | 403 | 404 | 502, 
    message: "List Item Checked Status Set" | Error Message,
    listItem: ListItem,
}`
                }}</code
              >
              <ul class="list-disc list-inside">
                <li>
                  A status of 200 indicates that the list item has had its
                  checked value set successfully. The listItem will be a
                  <a href="/docs/types#ListItem" class="underline text-blue-400"
                    >ListItem</a
                  >
                  object and represent the updated ListItem.
                </li>
                <li>A status of 400 indicates that the itemId is missing.</li>
                <li>
                  A status of 401 indicates that the API key is invalid or
                  missing.
                </li>
                <li>
                  A status of 403 indicates that the listItem does not belong to
                  the user.
                </li>
                <li>
                  A status of 404 indicates that the listItem does not exist.
                </li>
                <li>
                  A status of 502 indicates that there was an error with the
                  API.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- RenameItem -->
      <div
        id="RenameItem"
        class="flex flex-col w-full items-start justify-center"
      >
        <h1 class="text-3xl font-bold w-fit mb-2">RenameItem (PUT)</h1>
        <p>
          This endpoint is used to rename a list item. The request query strings
          should contain the id of the list item and the new name of the item.
          The response will contain the updated list item object.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md whitespace-pre">
                {{
                  `request: {
    headers: {
      authorization: String
    },
    body: {
      itemId: String,
      newItemName: String
    },
}`
                }}
              </code>
              <p>
                This endpoint requires the API key to be passed in the
                authorization header. The request body should contain the id of
                the list item to update and the new name of the item.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-scroll"
                >{{
                  `response: { 
    status: 200 | 400 | 401 | 403 | 404 | 502, 
    message: "List Item Renamed." | Error Message,
    listItem: ListItem,
}`
                }}</code
              >
              <ul class="list-disc list-inside">
                <li>
                  A status of 200 indicates that the list item has been renamed.
                  The listItem will be a
                  <a href="/docs/types#ListItem" class="underline text-blue-400"
                    >ListItem</a
                  >
                  object representing the new listItem.
                </li>
                <li>
                  A status of 400 indicates that the itemId or newItemName is
                  missing.
                </li>
                <li>
                  A status of 401 indicates that the API key is invalid or
                  missing.
                </li>
                <li>
                  A status of 403 indicates that the list item does not belong
                  to the user.
                </li>
                <li>
                  A status of 404 indicates that the list item does not exist.
                </li>
                <li>
                  A status of 502 indicates that there was an error with the
                  API.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- DeleteListItem -->
      <div
        id="DeleteListItem"
        class="flex flex-col w-full items-start justify-center"
      >
        <h1 class="text-3xl font-bold w-fit mb-2">DeleteListItem (DELETE)</h1>
        <p>
          This endpoint is used to delete a list item from the database. The
          request query strings should contain the id of the list item to be
          deleted. The response will contain a message indicating that the list
          item has been deleted and the list item that was deleted.
        </p>
        <div class="w-full flex items-start justify-center flex-wrap">
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Request</h2>
              <code class="bg-base-200 w-full rounded-md whitespace-pre">
                {{
                  `request: {
    headers: {
      authorization: String
    },
    queryStringParameters: {
      itemId: String,
    },
}`
                }}
              </code>
              <p>
                This endpoint requires the API key to be passed in the
                authorization header. The query parameters should contain the id
                of the list item to be deleted.
              </p>
            </div>
          </div>
          <div class="w-11/12 md:w-1/2 p-2">
            <div class="flex flex-col items-center justify-center w-11/12">
              <h2 class="text-2xl font-bold w-fit mb-2">Response</h2>
              <code
                class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-scroll"
                >{{
                  `response: { 
    status: 200 | 400 | 401 | 403 | 404 | 502, 
    message: "List Item Deleted" | Error Message,
    listItem: ListItem,
}`
                }}</code
              >
              <ul class="list-disc list-inside">
                <li>
                  A status of 200 indicates that the list item has been deleted.
                  The listItem will be a
                  <a href="/docs/types#ListItem" class="underline text-blue-400"
                    >ListItem</a
                  >
                  object.
                </li>
                <li>
                  A status of 400 indicates that the itemId or itemName is
                  missing.
                </li>
                <li>
                  A status of 401 indicates that the API key is invalid or
                  missing.
                </li>
                <li>
                  A status of 403 indicates that the list item does not belong
                  to the user.
                </li>
                <li>
                  A status of 404 indicates that the list item does not exist.
                </li>
                <li>
                  A status of 502 indicates that there was an error with the
                  API.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
