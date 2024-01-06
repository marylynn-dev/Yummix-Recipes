<template>
  <!-- Root application component -->
  <v-app>
    <!-- Custom app bar component -->
    <default-bar />

    <!-- Custom view component -->
    <default-view />
  </v-app>
</template>

<script setup>
// Importing custom components
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
</script>
