<template>
  <!-- Application bar with logo, search, and breadcrumbs -->
  <v-app-bar flat height="100">
    <div class="w-100">
      <v-row align="center">
        <!-- Logo and app name -->
        <v-col cols="2">
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
        <v-col align-self="center">
          <v-text-field
            v-model="query"
            variant="outlined"
            density="compact"
            rounded="0"
            label="Search"
            @keyup.enter="searchTrigger"
            class="mt-3"
            style="width: 500px; margin-left: 130px"
          >
            <!-- Search icon for triggering search -->
            <template v-slot:append-inner>
              <v-icon @click="searchTrigger">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-col>

        <!-- Breadcrumbs for navigation -->
        <v-col cols="4">
          <div>
            <v-row
              ><v-col class="my-auto"
                ><div class="d-flex">
                  <div class="text-center">
                    <v-menu open-on-hover>
                      <template v-slot:activator="{ props }">
                        <div class="d-flex">
                          <v-icon color="primary">mdi-account-circle</v-icon>
                          <v-btn color="primary" v-bind="props">
                            Account
                          </v-btn>
                        </div>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(item, index) in items"
                          :key="index"
                          :href="item.href"
                        >
                          <v-list-item-title>{{
                            item.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </div></v-col
              >
              <v-col class="my-auto"
                ><div class="d-flex justify-content-around">
                  <v-icon color="primary">mdi-heart</v-icon>
                  <p>Favourites</p>
                </div></v-col
              >
              <v-col class="my-auto"
                ><div class="d-flex justify-content-around">
                  <p>Contact Us</p>
                </div></v-col
              ></v-row
            >
          </div>
        </v-col>
      </v-row>
    </div>
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
    { title: "Login", href: "/login" },
    { title: "Sign Up", href: "#" },
    { title: "Log out", href: "#" },
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
