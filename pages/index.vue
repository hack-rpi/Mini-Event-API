<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <div
      class="w-full h-16 bg-primary flex items-center justify-center absolute top-0"
    >
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
    <div class="w-2/3 h-fit flex flex-col items-center justify-between">
      <h1 class="text-6xl font-bold text-center">HackRPI TODO API</h1>
      <p class="text-2xl text-center">
        Welcome to the HackRPI TODO API. This API is designed to help you learn
        how to use APIs and to help you build a TODO app. We have some google
        slides that you can use to help you get started. You can find them at
        the link below.
      </p>
      <div class="flex w-full items-center justify-around">
        <NuxtLink class="btn btn-secondary w-1/5" href="/docs"
          >Get Started</NuxtLink
        >
        <NuxtLink class="btn btn-secondary w-1/5" href="/api-key"
          >Get an API Key</NuxtLink
        >
        <NuxtLink class="btn btn-secondary w-1/5" href="https://hackrpi.com"
          >HackRPI</NuxtLink
        >
        <NuxtLink
          class="btn btn-secondary w-1/5"
          href="https://docs.google.com/presentation/d/1xv9dpFZsL-EIRKxk0VMnHiqxxm5tmzWKZxTvCvlUPSc/edit?usp=sharing"
          >Slides</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
