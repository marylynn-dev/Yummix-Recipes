<template>
  <div>
    <!-- Displaying the heading for search results -->
    <v-row class="mt-5 ml-5"> <h1>Search Results</h1> </v-row>

    <!-- Iterating over recipes and displaying each using FoodItem component -->
    <v-row>
      <v-col v-for="recipe in recipeStore.recipes" :key="recipe.id">
        <FoodItem :recipe="recipe"></FoodItem>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import FoodItem from "@/components/FoodItem.vue";
import { onMounted, getCurrentInstance } from "vue";
import { useRecipeStore } from "../store/recipe-store";

// Accessing the recipe store
const recipeStore = useRecipeStore();

// Accessing the global emitter to listen for search events from the appbar
const emitter = getCurrentInstance().appContext.config.globalProperties.emitter;

// Triggering search on component mount when a search event occurs
onMounted(() => {
  emitter.on("search", (data) => {
    searchRecipes(data.query);
  });
});
</script>
