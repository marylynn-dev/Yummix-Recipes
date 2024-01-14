<template>
  <!-- Recipe card with link to food details -->
  <v-card class="my-4 px-2" width="300" height="400" flat>
    <!-- Recipe image -->
    <router-link
      :to="{
        name: 'food-details',
        params: {
          recipeId: recipe.id,
          recipeImg: recipe.image,
          recipeTitle: recipe.title,
        },
      }"
    >
      <v-img
        :src="recipe.image"
        :width="300"
        :height="250"
        :alt="recipe.title"
        :lazy-src="recipe.title"
        cover
      ></v-img>
    </router-link>

    <!-- Recipe title -->
    <div class="title my-3">{{ recipe.title }}</div>

    <!-- Additional title details with ellipsis -->
    <div
      style="
        font-weight: 600;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      "
    >
      {{ recipe.title }}
    </div>

    <!-- Ratings and heart icon -->
    <v-card-text>
      <v-row align="center" class="mr-5 mt-2">
        <!-- Display recipe rating -->
        <v-rating
          :model-value="4.5"
          color="primary"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <!-- Display number of ratings -->
        <div class="text-grey ms-4">2,675 Ratings</div>

        <!-- Heart icon for favoriting -->
        <div>
          <v-icon
            color="primary"
            @click="recipeStore.toggleIsFav(recipe.id)"
            :class="{ iconColor: recipe.isFav }"
            >mdi-heart</v-icon
          >
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRecipeStore } from "@/store/recipe-store";

const recipeStore = useRecipeStore();

// Props setup
defineProps({
  recipe: Object,
});
</script>

<style scoped>
/* Scoped styling for the title */
.title {
  font-weight: 600;
  font-size: 12px;
  color: grey;
}
.iconColor {
  color: rgb(255, 4, 4); /* Red color for emphasis */
}
</style>
