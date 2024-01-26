/**
 * api.js
 *
 * API routes that are used in the store.
 */

import axios from "axios";
import { removeDuplicates, addIsFavProperty } from "./utils";
import { startNProgress, stopNProgress } from "../router/index"; // Corrected import names
const apiKey = "97f76fb1a6b1437e82c01c5e7aa8b3a1";

export let allRecipes = []
// Get all recipes based on a specific query
export const getRecipes = async (query) => {
    try {
        startNProgress();
        const res = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        const recipesWithIsFav = addIsFavProperty(res.data.results)
        allRecipes.push(...recipesWithIsFav)
        return recipesWithIsFav;
    } catch (error) {
        console.log(error);
    } finally {
        stopNProgress();
    }
};

// Get ingredients for a specific recipe
export const getIngredients = async (recipeId) => {
    try {
        startNProgress();
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json`,
            {
                params: { apiKey: apiKey },
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return removeDuplicates(response.data.ingredients, 'name');
    } catch (error) {
        console.error('Error fetching ingredients details:', error);
    } finally {
        stopNProgress();
    }
};

// Get steps for a specific recipe
export const getSteps = async (recipeId) => {
    try {
        startNProgress();
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
            {
                params: { apiKey: apiKey },
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching Steps details:', error);
    } finally {
        stopNProgress();
    }
};

// Get nutrition facts for a specific recipe
export const getNutrients = async (recipeId) => {
    try {
        startNProgress();
        const res = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json`, {
            params: { apiKey: apiKey },
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    } finally {
        stopNProgress();
    }
};

// Get similar recipes
export const getSimilarRecipes = async (recipeId) => {
    try {
        startNProgress();
        const res = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/similar`,
            {
                params: { apiKey: apiKey },
                headers: { 'Content-Type': 'application/json' },
            });
        const recipesWithIsFav = addIsFavProperty(res.data)
        allRecipes.push(...recipesWithIsFav)
        return recipesWithIsFav;
    } catch (error) {
        console.log(error);
    } finally {
        stopNProgress();
    }
};

// Get random recipes
export const getRandomRecipes = async () => {
    try {
        startNProgress();
        const res = await axios.get(`https://api.spoonacular.com/recipes/random?number=12`,
            {
                params: { apiKey: apiKey },
                headers: { 'Content-Type': 'application/json' },
            });
        const recipesWithIsFav = addIsFavProperty(res.data.recipes)
        allRecipes.push(...recipesWithIsFav)
        return recipesWithIsFav
    } catch (error) {
        console.log(error);
    } finally {
        stopNProgress();
    }
};

//get vegeterian recipes
export const getVegeterianRecipes = async () => {
    try {
        startNProgress();
        const res = await axios.get(`https://api.spoonacular.com/recipes/random?number=4&include-tags=vegetarian`,
            {
                params: { apiKey: apiKey },
                headers: { 'Content-Type': 'application/json' },
            });
        const recipesWithIsFav = addIsFavProperty(res.data.recipes)
        allRecipes.push(...recipesWithIsFav)
        return recipesWithIsFav
    } catch (error) {
        console.log(error);
    } finally {
        stopNProgress();
    }
};

//get breakfastRecipes
export const getBreakfastRecipes = async () => {
    try {
        startNProgress();
        const res = await axios.get(`https://api.spoonacular.com/recipes/random?number=4&include-tags=breakfast`,
            {
                params: { apiKey: apiKey },
                headers: { 'Content-Type': 'application/json' },
            });
        const recipesWithIsFav = addIsFavProperty(res.data.recipes)
        allRecipes.push(...recipesWithIsFav)
        return recipesWithIsFav
    } catch (error) {
        console.log(error);
    } finally {
        stopNProgress();
    }
};

//get mainCourse recipes
export const getMainCourseRecipes = async () => {
    try {
        startNProgress();
        const res = await axios.get(`https://api.spoonacular.com/recipes/random?number=4&include-tags=fingerfood`,
            {
                params: { apiKey: apiKey },
                headers: { 'Content-Type': 'application/json' },
            });
        const recipesWithIsFav = addIsFavProperty(res.data.recipes);
        allRecipes.push(...recipesWithIsFav)
        return recipesWithIsFav;
    } catch (error) {
        console.log(error);
    } finally {
        stopNProgress();
    }
};
