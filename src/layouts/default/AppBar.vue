<template>
  <!-- Application bar with logo, search, and breadcrumbs -->
  <v-app-bar flat height="100">
    <v-row>
      <!-- Logo and app name -->
      <v-col class="text-center" cols="3">
        <span class="text-primary text-h4 t">Yummix</span>
        <v-icon
          color="secondary"
          class="mb-4"
          icon="mdi-silverware-fork-knife"
        ></v-icon>
      </v-col>

      <!-- Search input field -->
      <v-col cols="5" class="mx-15">
        <v-text-field
          v-model="query"
          variant="outlined"
          density="compact"
          :rounded="false"
          label="Search"
          @keyup.enter="searchTrigger"
        >
          <!-- Search icon for triggering search -->
          <template v-slot:append-inner>
            <v-icon @click="searchTrigger">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>

      <!-- Breadcrumbs for navigation -->
      <v-col>
        <v-breadcrumbs :items="items" divider=" ">
          <!-- User account icon as a prepend to breadcrumbs -->
          <template v-slot:prepend>
            <v-icon
              size="small"
              icon="mdi-account-circle"
              color="primary"
            ></v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
const emitter = getCurrentInstance().appContext.config.globalProperties.emitter;

// Reactive data
const query = ref("");
const items = [
  { title: "Log in", href: "#" },
  { title: "Saved", href: "#" },
  { title: "Contact Us", href: "#" },
];

// Function to trigger search to be emitted and listened to in the Home.vue
function searchTrigger() {
  emitter.emit("search", { query: query.value });
}
</script>

<style scoped>
/* Scoped styling for the bold text */
.t {
  font-weight: 800;
}
</style>
