<template>
  <!-- Application bar with logo, search, and breadcrumbs -->
  <v-app-bar flat height="100">
    <v-container style="padding: 0px; margin: 0px">
      <v-row align="center" class="d-flex justify-content-between">
        <!-- Logo and app name -->
        <v-col cols="12" md="4">
          <div class="text-center" @click="handleClick">
            <span class="text-primary text-h4" style="font-weight: 800"
              >Yummix</span
            >
            <v-icon
              color="secondary"
              class="mb-4"
              icon="mdi-silverware-fork-knife"
            ></v-icon>
          </div>
        </v-col>

        <!-- Search input field -->
        <v-col cols="12" md="5">
          <v-text-field
            v-model="query"
            variant="outlined"
            density="compact"
            rounded="0"
            label="Search"
            @keyup.enter="searchTrigger"
            class="mt-3"
          >
            <!-- Search icon for triggering search -->
            <template v-slot:append-inner>
              <v-icon @click="searchTrigger">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-col>

        <!-- Breadcrumbs for navigation -->
        <v-col cols="12" md="3" class="mb-3">
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
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
const emitter = getCurrentInstance().appContext.config.globalProperties.emitter;
import { useRouter } from "vue-router";

const router = useRouter();

// Reactive data
const query = ref("");
const items = [
  { title: "Log in", href: "#" },
  { title: "Saved", href: "#" },
  { title: "Contact Us", href: "#" },
];

//function to handle reroute to home
const handleClick = () => {
  window.location.reload();
};

// Function to trigger search to be emitted and listened to in the Home.vue
function searchTrigger() {
  emitter.emit("search", { query: query.value });
}
</script>
