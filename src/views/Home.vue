<template>
  <div>
    <!-- Displaying the heading for What's trending if random recipes are present -->
    <v-row
      v-if="
        recipeStore.randomRecipes &&
        recipeStore.randomRecipes.length > 0 &&
        !hasSearched
      "
      class="mx-5 my-5"
      ><h1>What's Trending</h1></v-row
    >
    <!-- Iterating over recipes and displaying each using FoodItem component -->
    <v-row
      v-if="
        recipeStore.randomRecipes &&
        recipeStore.randomRecipes.length > 0 &&
        !hasSearched
      "
    >
      <v-col v-for="recipe in recipeStore.randomRecipes" :key="recipe.id">
        <FoodItem :recipe="recipe"></FoodItem>
      </v-col>
    </v-row>
    <!-- Displaying the heading for search results -->
    <v-row
      v-if="recipeStore.recipes && recipeStore.recipes.length > 0"
      class="mx-5 my-5"
      ><h1>Search Results</h1></v-row
    >
    <!-- Iterating over recipes and displaying each using FoodItem component -->
    <v-row v-if="recipeStore.recipes && recipeStore.recipes.length > 0">
      <v-col v-for="recipe in recipeStore.recipes" :key="recipe.id">
        <FoodItem :recipe="recipe"></FoodItem>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import FoodItem from "@/components/food-item.vue";
import { onMounted, getCurrentInstance, ref } from "vue";
import { useRecipeStore } from "../store/recipe-store";

//To track when the user has searched for a recipe so as to switch from the random recipes to the search results
const hasSearched = ref(false);

// Accessing the recipe store
const recipeStore = useRecipeStore();

// Accessing the global emitter to listen for search events from the appbar
const emitter = getCurrentInstance().appContext.config.globalProperties.emitter;

// Triggering search on component mount when a search event occurs
onMounted(() => {
  //get random recipes
  recipeStore.getRandomRecipes();
  //listem for the search emit
  emitter.on("search", (data) => {
    hasSearched.value = true;
    recipeStore.getRecipes(data.query);
  });
});
</script>
