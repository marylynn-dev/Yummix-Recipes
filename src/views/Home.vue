<template>
  <v-row class="mt-5 ml-5"> <h1>Search Results</h1> </v-row>
  <v-row>
    <v-col v-for="hit in hits" :key="hit.id">
      <FoodItem :hit="hit"></FoodItem>
    </v-col>
  </v-row>
</template>

<script setup>
import FoodItem from "@/components/FoodItem.vue";
import { ref, onMounted, getCurrentInstance } from "vue";
import axios from "axios";

const hits = ref([]);
const emitter = getCurrentInstance().appContext.config.globalProperties.emitter;
const apiKey = "97f76fb1a6b1437e82c01c5e7aa8b3a1";

const searchRecipes = (query) => {
  console.log("searching");
  console.log(query);
  axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}
`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res.data.results);
      hits.value = res.data.results;
    })
    .catch((err) => console.log(err));
};

onMounted(() => {
  emitter.on("search", (data) => {
    console.log(data);
    searchRecipes(data.query);

    console.log("I am running");
  });
});
</script>
