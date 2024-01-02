<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <div>
          <v-row>
            <h1>Potatoes</h1>
          </v-row>
          <v-row>
            <v-breadcrumbs>
              <v-breadcrumbs-item>
                <v-row align="center">
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
              <template v-slot:divider>
                <v-icon icon="mdi-minus" horizontal></v-icon>
              </template>
            </v-breadcrumbs>
          </v-row>
          <v-row>
            <div class="d-flex justify-space-between my-2 pb-0">
              <v-btn-toggle
                multiple
                variant="outlined"
                divided
                rounded="0"
                color="primary"
              >
                <v-btn color="primary" append-icon="mdi-heart-outline">
                  <template v-slot:append
                    ><v-icon color="primary"></v-icon
                  ></template>
                  Save</v-btn
                >
                <v-btn color="primary" append-icon="mdi-star-outline">
                  <template v-slot:append
                    ><v-icon color="primary"></v-icon
                  ></template>
                  Rate</v-btn
                >
                <v-btn color="primary" append-icon="mdi-printer-outline">
                  <template v-slot:append
                    ><v-icon color="primary"></v-icon
                  ></template>
                  Print</v-btn
                >
                <v-btn color="primary" append-icon="mdi-share">
                  <template v-slot:append
                    ><v-icon color="primary" size="{5}"></v-icon
                  ></template>
                  Share</v-btn
                >
              </v-btn-toggle>
            </div>
          </v-row>
          <v-row>
            <v-img
              :src="props.img"
              :width="200"
              :height="500"
              alt=""
              lazy-src=""
              cover
            ></v-img
          ></v-row>
          <v-row class="my-5">
            <div><h1>Ingredients</h1></div>
          </v-row>
          <v-row v-for="ingredient in ingredients" :key="ingredient.name">
            {{ convertToFraction(ingredient.amount.us.value) }}
            {{ ingredient.amount.us.unit }}
            {{ ingredient.name }}
          </v-row>
          <v-row>{{ steps }} </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Fraction from "@mathematics/fraction";

const props = defineProps(["id", "img"]);
const ingredients = ref();
const apiKey = "97f76fb1a6b1437e82c01c5e7aa8b3a1";
const steps = ref([]);

onMounted(() => {
  fetchHitDetails(props.id);
  fetchSteps(props.id);
});
// function for getting the ingredents
async function fetchHitDetails(hitId) {
  console.log(hitId);
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${hitId}/ingredientWidget.json`,
      {
        params: {
          apiKey: apiKey,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    ingredients.value = removeDuplicates(response.data.ingredients, "name");
  } catch (error) {
    console.error("Error fetching ingredients details:", error);
  }
}
//function to convert the amounts to fraction
function convertToFraction(decimal) {
  // Convert to fraction
  const fraction = new Fraction(decimal);
  // Convert improper fraction to mixed fraction
  const arr = [fraction._numerator, fraction._denominator];
  const properToMixed = (arr) => {
    const quotient = Math.floor(arr[0] / arr[1]);
    const remainder = arr[0] % arr[1];
    if (remainder === 0) {
      return `${quotient}`;
    } else {
      if (quotient === 0) {
        return `${remainder}/${arr[1]}`;
      }
      return `${quotient} ${remainder}/${arr[1]}`;
    }
  };

  return properToMixed(arr);
}
//function to remove duplicate ingredients
function removeDuplicates(array, key) {
  return array.filter(
    (item, index, self) => self.findIndex((t) => t[key] === item[key]) === index
  );
}
//function to get the steps
async function fetchSteps(hitId) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${hitId}/analyzedInstructions`,
      {
        params: {
          apiKey: apiKey,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    steps.value = response;
  } catch (error) {
    console.error("Error fetching Steps details:", error);
  }
}
</script>
