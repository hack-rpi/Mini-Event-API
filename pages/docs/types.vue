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
  <div
    class="w-full flex items-start justify-center overflow-y-auto flex-wrap px-4"
  >
    <div id="List" class="w-full md:w-1/2 min-w-[320px] pb-2">
      <h1 class="text-3xl font-bold w-fit mb-2">List</h1>
      <p>
        The List type is used to represent a list of items. It has the following
        properties:
      </p>
      <ul class="list-disc list-inside">
        <li><code>id</code> - The unique identifier for the list.</li>
        <li><code>listName</code> - The name of the list.</li>
        <li>
          <code>createdAt</code> - - The unix timestamp (number of milliseconds
          since Jan 1 1970) of when the item was created.
        </li>
      </ul>
      <div class="flex flex-col items-center justify-center w-11/12">
        <h2 class="text-2xl font-bold w-fit mb-2">Typescript Type:</h2>
        <code
          class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-auto"
          >{{
            `type List = {
    id: string;
    listName: string;
    createdAt: number;
}`
          }}</code
        >
      </div>
      <div class="flex flex-col items-center justify-center w-11/12">
        <h2 class="text-2xl font-bold w-fit mb-2">Example:</h2>
        <code
          class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-auto"
          >{{
            `{
    id: "${uuidv4()}";
    listName: "My List";
    createdAt: ${Date.now()};
}`
          }}</code
        >
      </div>
    </div>
    <div id="ListItem" class="w-full md:w-1/2 min-w-[320px]">
      <h1 class="text-3xl font-bold w-fit mb-2">ListItem</h1>
      <p>
        The ListItem type is used to represent an item in a list. It has the
        following properties:
      </p>
      <ul class="list-disc list-inside">
        <li><code>id</code> - The unique identifier for the item.</li>
        <li><code>itemName</code> - The name of the item.</li>
        <li>
          <code>checked</code> - A boolean representing whether the item is
          checked off or not.
        </li>
        <li>
          <code>createdAt</code> - The unix timestamp (number of milliseconds
          since Jan 1 1970) of when the item was created.
        </li>
      </ul>
      <div class="flex flex-col items-center justify-center w-11/12">
        <h2 class="text-2xl font-bold w-fit mb-2">Typescript Type:</h2>
        <code
          class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-auto"
          >{{
            `type ListItem = {
    id: string;
    itemName: string;
    checked: boolean;
    createdAt: number;
}`
          }}</code
        >
      </div>
      <div class="flex flex-col items-center justify-center w-11/12">
        <h2 class="text-2xl font-bold w-fit mb-2">Example:</h2>
        <code
          class="bg-base-200 w-full rounded-md whitespace-pre text-left overflow-x-auto"
          >{{
            `{
    id: "${uuidv4()}";
    itemName: "Finish Homework";
    checked: ${Math.random() > 0.5};
    createdAt: ${Date.now()};
}`
          }}</code
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
</script>
