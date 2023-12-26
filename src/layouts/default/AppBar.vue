<template>
  <v-app-bar flat height="100">
    <v-row
      ><v-col class="text-center" cols="3"
        ><span class="text-primary text-h4 t">Yummix</span>
        <v-icon color="secondary" class="mb-4" icon="mdi-silverware-fork-knife"
      /></v-col>

      <v-col cols="5 ">
        <v-text-field
          v-model="query"
          variant="outlined"
          density="compact"
          :rounded="false"
          label="Search"
          @keyup.enter="searchTrigger"
        >
          <template v-slot:append-inner>
            <v-icon @click="searchTrigger">mdi-magnify</v-icon></template
          ></v-text-field
        ></v-col
      >
      <v-col>
        <v-breadcrumbs :items="items" divider=" ">
          <template v-slot:prepend>
            <v-icon
              size="small"
              icon="mdi-account-circle"
              color="primary"
            ></v-icon>
          </template> </v-breadcrumbs></v-col
      >.
    </v-row>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const query = ref("");
const items = [
  { title: "Log in", href: "#", disabled: false },
  { title: "Saved", href: "#", disabled: false },
  { title: "Contact Us", href: "#", disabled: false },
];

const emit = defineEmits();

function searchTrigger() {
  emit("search", query.value);
  console.log("emmited");
}
</script>

<style scoped>
.t {
  font-weight: 800;
}
</style>
