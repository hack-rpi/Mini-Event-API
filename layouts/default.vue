<template>
  <div class="flex flex-col w-screen h-screen items-start justify-center">
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
      class="flex items-center justify-center w-full flex-grow flex-shrink basis-auto"
    >
      <slot></slot>
    </div>
    <div class="w-full h-16 bg-primary flex items-center justify-center">
      <div class="w-1/3 flex items-center justify-center">
        <NuxtLink
          href="https://hackrpi.com"
          class="text-primary-content text-lg"
          >&copy; 2024 HackRPI</NuxtLink
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
  </div>
</template>
