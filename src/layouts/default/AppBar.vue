<template>
  <v-app-bar flat height="100">
    <v-row>
      <v-col class="text-center" cols="3">
        <span class="text-primary text-h4 t">Yummix</span>
        <v-icon
          color="secondary"
          class="mb-4"
          icon="mdi-silverware-fork-knife"
        ></v-icon>
      </v-col>

      <v-col cols="5" class="mx-15">
        <v-text-field
          v-model="query"
          variant="outlined"
          density="compact"
          :rounded="false"
          label="Search"
          @keyup.enter="searchTrigger"
        >
          <template v-slot:append-inner>
            <v-icon @click="searchTrigger">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col>
        <v-breadcrumbs :items="items" divider=" ">
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

const query = ref("");
const items = [
  { title: "Log in", href: "#" },
  { title: "Saved", href: "#" },
  { title: "Contact Us", href: "#" },
];

function searchTrigger() {
  console.log("emitted");
  emitter.emit("search", { query: query.value });
}
</script>

<style scoped>
.t {
  font-weight: 800;
}
</style>
