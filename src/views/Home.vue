<template>
  <v-row
    ><v-col
      ><div>
        <!-- Displaying the heading for What's trending if random recipes are present -->
        <v-row
          v-if="
            recipeStore.randomRecipes &&
            recipeStore.randomRecipes.length > 0 &&
            !hasSearched
          "
          class="ml-2 my-3"
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
        <!-- Displaying the heading for Go meatless if random recipes are present -->
        <v-row
          v-if="
            recipeStore.vegeterianRecipes &&
            recipeStore.vegeterianRecipes.length > 0 &&
            !hasSearched
          "
          class="ml-2 my-2"
          ><h1>Go meatless</h1></v-row
        >
        <!-- Iterating over recipes and displaying each using FoodItem component -->
        <v-row
          v-if="
            recipeStore.vegeterianRecipes &&
            recipeStore.vegeterianRecipes.length > 0 &&
            !hasSearched
          "
        >
          <v-col
            v-for="recipe in recipeStore.vegeterianRecipes"
            :key="recipe.id"
          >
            <FoodItem :recipe="recipe"></FoodItem>
          </v-col>
        </v-row>
        <!-- Displaying the heading for Just Breakfast if random recipes are present -->
        <v-row
          v-if="
            recipeStore.breakfastRecipes &&
            recipeStore.breakfastRecipes.length > 0 &&
            !hasSearched
          "
          class="ml-2 my-2"
          ><h1>Just Breakfast</h1></v-row
        >
        <!-- Iterating over recipes and displaying each using FoodItem component -->
        <v-row
          v-if="
            recipeStore.breakfastRecipes &&
            recipeStore.breakfastRecipes.length > 0 &&
            !hasSearched
          "
        >
          <v-col
            v-for="recipe in recipeStore.breakfastRecipes"
            :key="recipe.id"
          >
            <FoodItem :recipe="recipe"></FoodItem>
          </v-col>
        </v-row>

        <!-- Displaying the heading for Fill your Table if random recipes are present -->
        <v-row
          v-if="
            recipeStore.mainCourseRecipes &&
            recipeStore.mainCourseRecipes.length > 0 &&
            !hasSearched
          "
          class="ml-2 my-2"
          ><h1>Fill your Table</h1></v-row
        >
        <!-- Iterating over recipes and displaying each using FoodItem component -->
        <v-row
          v-if="
            recipeStore.mainCourseRecipes &&
            recipeStore.mainCourseRecipes.length > 0 &&
            !hasSearched
          "
        >
          <v-col
            v-for="recipe in recipeStore.mainCourseRecipes"
            :key="recipe.id"
          >
            <FoodItem :recipe="recipe"></FoodItem>
          </v-col>
        </v-row>

        <!-- Displaying the heading for search results -->
        <v-row
          v-if="recipeStore.recipes && recipeStore.recipes.length > 0"
          class="ml-2 my-3"
          ><h1>Search Results</h1></v-row
        >
        <!-- Iterating over recipes and displaying each using FoodItem component -->
        <v-row v-if="recipeStore.recipes && recipeStore.recipes.length > 0">
          <v-col v-for="recipe in recipeStore.recipes" :key="recipe.id">
            <FoodItem :recipe="recipe"></FoodItem>
          </v-col>
        </v-row>

        <!-- Displaying the heading for search results -->
        <v-row
          v-if="
            filter === true &&
            recipeStore.favourites &&
            recipeStore.favourites.length > 0
          "
          class="ml-2 my-3"
          ><h1>Favourites</h1></v-row
        >
        <!-- Iterating over recipes and displaying each using FoodItem component -->
        <v-row
          v-if="recipeStore.favourites && recipeStore.favourites.length > 0"
        >
          <v-col v-for="recipe in recipeStore.favourites" :key="recipe.id">
            <FoodItem :recipe="recipe"></FoodItem>
          </v-col>
        </v-row></div></v-col
  ></v-row>
</template>

<script setup>
import FoodItem from "@/components/food-item.vue";
import { onMounted, getCurrentInstance, ref } from "vue";
import { useRecipeStore } from "../store/recipe-store";

//To track when the user has searched for a recipe so as to switch from the random recipes to the search results
const hasSearched = ref(false);

//To track when user has selected favourites
const filter = ref(true);

// Accessing the recipe store
const recipeStore = useRecipeStore();

// Accessing the global emitter to listen for search events from the appbar
const emitter = getCurrentInstance().appContext.config.globalProperties.emitter;

// Triggering search on component mount when a search event occurs
onMounted(() => {
  // //get random recipes
  // recipeStore.getRandomRecipes();

  // //get vegeterian recipes
  // recipeStore.getVegeterianRecipes();

  // //get breakfast recipes
  // recipeStore.getBreakfastRecipes();

  //get main course recipes
  recipeStore.getMainCourseRecipes();

  //listen for the search emit
  emitter.on("search", (data) => {
    hasSearched.value = true;
    recipeStore.getRecipes(data.query);
  });
});
</script>
