<template>
  <v-app>
    <default-bar />
    <default-view />
  </v-app>
</template>

<script setup>
import { ref, provide } from "vue";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";

const searchTrigger = ref(null);

provide("searchTrigger", searchTrigger);
</script>
