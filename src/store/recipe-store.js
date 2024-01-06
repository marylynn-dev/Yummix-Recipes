// utilities
import { defineStore } from 'pinia';
import { getRecipes, getIngredients, getSteps, getNutrients } from 'helpers/api';

// define and export the recipe store using pinia
export const useRecipeStore = defineStore('recipeStore', {
    state: () => ({
        ingredients: [],
        steps: [],
        apiKey: "97f76fb1a6b1437e82c01c5e7aa8b3a1",
        nutrients: [],
        recipes: []
    }),
    // define actions for the store
    actions: {
        // action to get recipes
        async searchRecipes(query) {
            try {
                this.recipes = await getRecipes(query, this.apiKey);
            } catch (error) {
                console.log(error);
            }
        },
        // action to get ingredients
        async getIngredients(recipeId) {
            try {
                this.ingredients = await getIngredients(recipeId, this.apiKey);
            } catch (error) {
                console.error('Error fetching ingredients details:', error);
            }
        },
        // action to get steps
        async getSteps(recipeId) {
            try {
                this.steps = await getSteps(recipeId, this.apiKey);
            } catch (error) {
                console.error('Error fetching Steps details:', error);
            }
        },
        // action to get nutrition facts
        async getNutrients(recipeId) {
            try {
                this.nutrients = await getNutrients(recipeId, this.apiKey);
            } catch (error) {
                console.error('Error fetching Nutrients ', error);
            }
        },



    }
});
