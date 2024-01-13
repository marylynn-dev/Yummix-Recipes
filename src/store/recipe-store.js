// utilities
import { defineStore } from 'pinia';
import { getRecipes, getIngredients, getSteps, getNutrients, getSimilarRecipes, getRandomRecipes } from '../services/api';

// define and export the recipe store using pinia
export const useRecipeStore = defineStore('recipeStore', {
    state: () => ({
        ingredients: [],
        steps: [],
        nutrients: [],
        recipes: [],
        similarRecipes: [],
        randomRecipes: []
    }),
    // define actions for the store
    actions: {
        // action to get recipes
        async getRecipes(query) {
            try {
                this.recipes = await getRecipes(query);
            } catch (error) {
                console.log(error);
            }
        },
        // action to get ingredients
        async getIngredients(recipeId) {
            try {
                this.ingredients = await getIngredients(recipeId);
            } catch (error) {
                console.error('Error fetching ingredients details:', error);
            }
        },
        // action to get steps
        async getSteps(recipeId) {
            try {
                this.steps = await getSteps(recipeId);
            } catch (error) {
                console.error('Error fetching Steps details:', error);
            }
        },
        // action to get nutrition facts
        async getNutrients(recipeId) {
            try {
                this.nutrients = await getNutrients(recipeId);
            } catch (error) {
                console.error('Error fetching Nutrients ', error);
            }
        },
        // action to get similar recipes
        async getSimilarRecipes(recipeId) {
            try {
                this.similarRecipes = await getSimilarRecipes(recipeId);
            } catch (error) {
                console.error('Error fetching Nutrients ', error);
            }
        },
        // action to get similar recipes
        async getRandomRecipes() {
            try {
                this.randomRecipes = await getRandomRecipes();
            } catch (error) {
                console.error('Error fetching Nutrients ', error);
            }
        },

    }
});
