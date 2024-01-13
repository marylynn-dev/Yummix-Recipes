<template>
  <!-- Recipe card with link to food details -->
  <v-card
    class="mx-auto my-4 px-2"
    max-width="350"
    max-height="400"
    flat
    :to="{
      name: 'food-details',
      params: {
        recipeId: recipe.id,
        recipeImg: recipe.image,
        recipeTitle: recipe.title,
      
      },
    }"
  >
    <!-- Recipe image -->
    <v-img
      :src="recipe.image"
      :width="300"
      :height="250"
      :alt="recipe.title"
      :lazy-src="recipe.title"
      cover
    ></v-img>

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
      <v-row align="center" class="mr-13 mt-2">
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
        <div><v-icon color="primary">mdi-heart</v-icon></div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
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
</style>
