<template>
  <div class="w-full h-16 bg-primary flex items-center justify-center">
    <div class="w-1/3 flex items-center justify-center">
      <NuxtLink class="text-primary-content text-3xl font-semibold" href="/"
        >HackRPI TODO API</NuxtLink
      >
    </div>
    <div class="w-2/3 flex items-center justify-end">
      <NuxtLink class="mx-4 btn btn-secondary btn-sm w-32" href="/docs"
        >Docs</NuxtLink
      >
      <NuxtLink class="mx-4 btn btn-secondary btn-sm w-32" href="/api-key"
        >Get an API Key</NuxtLink
      >
    </div>
  </div>
  <div class="w-full h-fit flex items-center justify-center flex-col">
    <div class="w-11/12 flex flex-col overflow-y-auto">
      <h1
        class="text-3xl font-bold w-fit mb-2 flex items-center justify-center"
      >
        Overview
      </h1>
      <p>
        The HackRPI TODO API is a RESTful API that allows you to manage a list
        of TODO items. You can create, read, update, and delete TODO lists and
        items using the API. The API will return JSON responses for all
        requests. And has two major data types: Lists and ListItems. You can
        learn more about these types at:
      </p>
      <NuxtLink href="/docs/types" class="btn btn-link btn-primary"
        >Data Types</NuxtLink
      >
      <h1 class="text-3xl font-bold w-fit mb-2">API Key</h1>
      <p>
        You can get an API key by clicking the button below, and creating an
        account if you haven't already. This account is purely to prevent abuse
        of the API, and will not be used for any other purpose.
      </p>
      <div class="flex items-center justify-center my-4">
        <NuxtLink class="btn btn-primary" href="/api-key"
          >Get an API Key</NuxtLink
        >
      </div>
      <p>
        Once you have an API key, you can use it to authenticate your requests
        to the API by adding it to the authorization header.
      </p>
      <p class="py-2">
        For example, if you have an API key of <code>1234</code>, you would add
        the following header to your request:
      </p>
      <code> headers: { authorization: "1234" } </code>
      <h1 class="text-3xl font-bold w-fit mb-2">Endpoints</h1>
      <p>
        The API has the following endpoints for manipulating lists and list
        items. You can learn more about each endpoint, what they do, what the
        request should look like and what the response will look like by
        clicking on the link. The endpoints should be capitalized as shown.
      </p>
      <ul class="list-disc list-inside">
        <li>
          <NuxtLink
            href="/docs/endpoints/#status"
            class="btn btn-sm btn-link btn-primary"
            >status</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="/docs/endpoints/#GetLists"
            class="btn btn-sm btn-link btn-primary"
            >GetLists</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="/docs/endpoints/#AddList"
            class="btn btn-sm btn-link btn-primary"
            >AddList</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="/docs/endpoints/#DeleteList"
            class="btn btn-sm btn-link btn-primary"
            >DeleteList</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="/docs/endpoints/#GetListItems"
            class="btn btn-sm btn-link btn-primary"
            >GetListItems</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="/docs/endpoints/#AddListItem"
            class="btn btn-sm btn-link btn-primary"
            >AddListItem</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="/docs/endpoints/#SetChecked"
            class="btn btn-sm btn-link btn-primary"
            >SetChecked</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="/docs/endpoints/#RenameItem"
            class="btn btn-sm btn-link btn-primary"
            >RenameItem</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="/docs/endpoints/#DeleteListItem"
            class="btn btn-sm btn-link btn-primary"
            >DeleteListItem</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
