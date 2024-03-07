<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import awsconfig from "../aws-exports";
import { ref } from "vue";
import { get, post } from "aws-amplify/api";

const hasAPIKey = ref(false);
const apiKey = ref("");

async function getAPIKey() {
  const session = await fetchAuthSession();
  const jwt = session.tokens?.idToken?.toString();
  if (!jwt) {
    return;
  }

  try {
    const restOperation = get({
      apiName: "APIKeyManager",
      options: { headers: { authorization: jwt } },
      path: "/getKey",
    });

    const response = await restOperation.response;
    const reponseJson = JSON.parse(await response.body.text());
    apiKey.value = reponseJson.apiKey;
    hasAPIKey.value = true;
  } catch (error) {
    console.error(error);
  }
}

function copyAPIKeyToClipboard() {
  navigator.clipboard.writeText(apiKey.value);
}

async function refreshAPIKey() {
  hasAPIKey.value = false;
  apiKey.value = "";

  const session = await fetchAuthSession();
  const jwt = session.tokens?.idToken?.toString();
  if (!jwt) {
    return;
  }

  try {
    const restOperation = post({
      apiName: "APIKeyManager",
      options: { headers: { authorization: jwt } },
      path: "/refreshKey",
    });

    const response = await restOperation.response;
    const reponseJson = JSON.parse(await response.body.text());
    apiKey.value = reponseJson.apiKey;
    hasAPIKey.value = true;
  } catch (error) {
    console.error(error);
  }
}

Amplify.configure(awsconfig);
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <div class="w-full h-full flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold w-fit">API Key</h1>
        <div class="w-5/6 h-1/3 flex flex-col items-center justify-around">
          <div v-if="hasAPIKey === false">
            <p>Click the button to see your API Key</p>
            <button @click="getAPIKey">Show API Key</button>
          </div>
          <div
            class="flex flex-col items-center justify-around h-full w-full"
            v-else
          >
            <p>Your API Key is:</p>
            <p class="bg-base-300 p-4 rounded-full mr-4">{{ apiKey }}</p>
            <div>
              <button
                class="btn btn-primary mx-2"
                @click="copyAPIKeyToClipboard"
              >
                Copy to Clipboard
              </button>
              <button class="btn btn-primary mx-2" @click="refreshAPIKey">
                Refresh
              </button>
              <button class="btn btn-warning mx-2" @click="signOut">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </authenticator>
</template>
