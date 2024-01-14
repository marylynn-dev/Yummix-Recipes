// utilities
import { defineStore } from 'pinia';
import {
    getRecipes,
    getIngredients,
    getSteps,
    getNutrients,
    getSimilarRecipes,
    getRandomRecipes,
    getVegeterianRecipes,
    getBreakfastRecipes,
    getMainCourseRecipes,
} from '../services/api';

// define and export the recipe store using pinia
export const useRecipeStore = defineStore('recipeStore', {
    state: () => ({
        ingredients: [],
        steps: [],
        nutrients: [],
        recipes: [],
        similarRecipes: [],
        randomRecipes: [],
        vegeterianRecipes: [],
        breakfastRecipes: [],
        mainCourseRecipes: [],
        allRecipes: []
    }),
    //define getters for the store
    getters: {
        allRecipesWithIsFav(state) {
            // Combine recipes from different categories into one array
            return [
                ...state.recipes,
                ...state.similarRecipes,
                ...state.randomRecipes,
                ...state.vegeterianRecipes,
                ...state.breakfastRecipes,
                ...state.mainCourseRecipes,
            ];
        },
    },
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
                console.error('Error getting ingredients details:', error);
            }
        },
        // action to get steps
        async getSteps(recipeId) {
            try {
                this.steps = await getSteps(recipeId);
            } catch (error) {
                console.error('Error getting Steps details:', error);
            }
        },
        // action to get nutrition facts
        async getNutrients(recipeId) {
            try {
                this.nutrients = await getNutrients(recipeId);
            } catch (error) {
                console.error('Error getting Nutrients ', error);
            }
        },
        // action to get similar recipes
        async getSimilarRecipes(recipeId) {
            try {
                this.similarRecipes = await getSimilarRecipes(recipeId);
            } catch (error) {
                console.error('Error getting Similar recipes ', error);
            }
        },
        // action to get similar recipes
        async getRandomRecipes() {
            try {
                this.randomRecipes = await getRandomRecipes();
            } catch (error) {
                console.error('Error getting Random Recipes ', error);
            }
        },
        //action to get vegeterian recipes
        async getVegeterianRecipes() {
            try {
                this.vegeterianRecipes = await getVegeterianRecipes();
            } catch (error) {
                console.error('Error getting vegeterian recipes ', error);
            }
        },
        //action to get breakfast recipes
        async getBreakfastRecipes() {
            try {
                this.breakfastRecipes = await getBreakfastRecipes();
            } catch (error) {
                console.error('Error getting breakfast recipes ', error);
            }
        },
        //action to get mainCourse recipes
        async getMainCourseRecipes() {
            try {
                this.mainCourseRecipes = await getMainCourseRecipes();
            } catch (error) {
                console.error('Error getting mainCourse recipes ', error);
            }
        },
        //action to toggle favourites
        toggleIsFav(recipeId) {
            const recipe = this.allRecipesWithIsFav.find(recipe => recipe.id === recipeId);
            if (recipe) {
                recipe.isFav = !recipe.isFav;
            }
        },
    }
});
