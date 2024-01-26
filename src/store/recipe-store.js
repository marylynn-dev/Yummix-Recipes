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
    allRecipes
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
        allRecipes: allRecipes
    }),
    //define getters for the store
    getters: {
        // Getter to filter and return favorite tasks
        favourites(state) {
            console.log(state.allRecipes.filter((recipe) => recipe.isFav === true))
            return state.allRecipes.filter((recipe) => recipe.isFav === true);
        }
    },
    // define actions for the store
    actions: {
        //action to toggle isFav property
        async toggleIsFav(id) {
            const flattenedArray = this.allRecipes.flat()
            let selectedRecipe;
            for (let i = 0; i < this.allRecipes.length; i++) {
                if (this.allRecipes[i].id === id) {
                    selectedRecipe = this.allRecipes[i]
                    console.log(selectedRecipe);
                    break;
                }
            }

            if (selectedRecipe) {
                selectedRecipe.isFav = !selectedRecipe.isFav;
            } else {
                console.log('Recipe not found');
            }
        },

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

    }
});
