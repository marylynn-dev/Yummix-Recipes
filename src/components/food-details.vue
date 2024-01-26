<template>
  <!-- Main container for the recipe details -->
  <v-container>
    <!-- Row containing recipe information -->
    <v-row>
      <!-- Column for recipe details -->
      <v-col cols="6">
        <!-- Recipe title -->
        <div>
          <v-row>
            <h1>{{ props.title }}</h1>
          </v-row>

          <!-- Breadcrumbs and ratings -->
          <v-row>
            <v-breadcrumbs>
              <v-breadcrumbs-item>
                <v-row align="center">
                  <!-- Rating display -->
                  <v-rating
                    :model-value="4.5"
                    color="primary"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                  <div>4.7(1,850)</div>
                </v-row>
              </v-breadcrumbs-item>
              <v-breadcrumbs-item class="mx-10">
                2,675 Ratings
              </v-breadcrumbs-item>
              <!-- Divider between breadcrumbs -->
              <template v-slot:divider>
                <v-icon icon="mdi-minus" horizontal></v-icon>
              </template>
            </v-breadcrumbs>
          </v-row>

          <!-- Action buttons -->
          <v-row>
            <div class="d-flex justify-space-between my-2 pb-0">
              <!-- Button toggle for save, rate, print, and share actions -->
              <v-btn-toggle
                multiple
                variant="outlined"
                divided
                rounded="0"
                color="primary"
              >
                <!-- Save button -->
                <v-btn color="primary" append-icon="mdi-heart-outline">
                  <template v-slot:append>
                    <v-icon
                      @click="recipeStore.toggleIsFav(recipe.id)"
                      >mdi-heart</v-icon
                    >
                  </template>
                  Save
                </v-btn>
                <!-- Rate button -->
                <v-btn color="primary" append-icon="mdi-star-outline">
                  <template v-slot:append>
                    <v-icon color="primary"></v-icon>
                  </template>
                  Rate
                </v-btn>
                <!-- Print button -->
                <v-btn color="primary" append-icon="mdi-printer-outline">
                  <template v-slot:append>
                    <v-icon color="primary"></v-icon>
                  </template>
                  Print
                </v-btn>
                <!-- Share button -->
                <v-btn color="primary" append-icon="mdi-share">
                  <template v-slot:append>
                    <v-icon color="primary" size="{5}"></v-icon>
                  </template>
                  Share
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-row>

          <!-- Recipe image -->
          <v-row>
            <v-img
              :src="props.img"
              :width="200"
              :height="500"
              alt=""
              lazy-src=""
              cover
            ></v-img>
          </v-row>

          <!-- Ingredients section -->
          <v-row class="my-5">
            <div><h1>Ingredients</h1></div>
          </v-row>

          <!-- Display ingredients -->
          <v-row
            v-for="ingredient in recipeStore.ingredients"
            :key="ingredient.name"
          >
            {{ convertToFraction(ingredient.amount.us.value) }}
            {{ ingredient.amount.us.unit }}
            {{ ingredient.name }}
          </v-row>

          <!-- Directions section -->
          <v-row class="my-5">
            <div><h1>Directions</h1></div>
          </v-row>

          <!-- Display recipe steps -->
          <v-row
            v-if="recipeStore.steps[0]"
            v-for="(step, i) in recipeStore.steps[0].steps"
            :key="i"
          >
            <p>{{ `${i + 1}. &nbsp ${step.step}` }}</p>
            <v-img :src="step.image"></v-img>
          </v-row>

          <!-- Display nutrition facts -->
          <v-row class="mt-15">
            <div>
              <h1>
                Nutrition Facts<span style="font-size: 20px"
                  >(Per Serving)</span
                >
              </h1>
            </div>
          </v-row>
          <v-row v-if="recipeStore.nutrients">
            <v-col>
              <div style="font-weight: 900">
                {{ recipeStore.nutrients.calories }}
              </div>
              <p>Calories</p>
            </v-col>
            <v-col>
              <div style="font-weight: 900">
                {{ recipeStore.nutrients.fat }}
              </div>
              <p>Fat</p>
            </v-col>
            <v-col>
              <div style="font-weight: 900">
                {{ recipeStore.nutrients.carbs }}
              </div>
              <p>Carbs</p>
            </v-col>
            <v-col>
              <div style="font-weight: 900">
                {{ recipeStore.nutrients.protein }}
              </div>
              <p>Protein</p>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-15">
      <div><h1>You'll also love</h1></div> </v-row
    ><v-row>
      <v-col v-for="recipe in recipeStore.similarRecipes" :key="recipe.id">
        <foodItem :recipe="recipe"></foodItem>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRecipeStore } from "../store/recipe-store";
import { convertToFraction } from "../services/utils";
import foodItem from "./food-item.vue";
const recipeStore = useRecipeStore();

const props = defineProps(["id", "img", "title"]);

// get recipe details on component setup
recipeStore.getIngredients(props.id);
recipeStore.getSteps(props.id);
recipeStore.getNutrients(props.id);
recipeStore.getSimilarRecipes(props.id);
</script>

<style scoped>
.iconColor {
  color: rgb(255, 4, 4); /* Red color for emphasis */
}
</style>
