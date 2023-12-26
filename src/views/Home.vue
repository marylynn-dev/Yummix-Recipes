<template>
  <v-row>
    <AppBar.vue @search="searchRecipes" />
    <v-col v-for="hit in hits" :key="hit.recipe.uri">
      <FoodItem :hit="hit"></FoodItem>
    </v-col>
  </v-row>
</template>

<script setup>
import FoodItem from "@/components/FoodItem.vue";
import { ref, inject, watch } from "vue";
import axios from "axios";

const hits = ref([]);
const searchTrigger = inject("searchTrigger");

const searchRecipes = (query) => {
  const apiKey = "/api/recipes/v2";
  const apiUrl = "https://api.edamam.com/api/recipes/v2";

  axios
    .get(apiUrl, {
      params: { q: query.value, app_id: "c50c7b73", app_key: apiKey },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

watch(searchTrigger, (newValue) => {
  console.log(searchTrigger);
  if (newValue) {
    newValue.$on("triggerSearch", doSearch);
  }
});
</script>
