/**
 * api.js
 *
 * api routes that are used in the store 
 */

import axios from "axios";
import { removeDuplicates } from "./utils";

//get all recipes based on a specific query
export const getRecipes = async (query) => {
    try {
        const res = axios
            .get(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}
`,
                {
                    headers: { "Content-Type": "application/json" },
                }
            )

        return res.data.results
    } catch (error) {
        console.log(error)
    }
}
//Get ingredients for a specific recipe
export const getIngredients = async (recipeId) => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json`,
            {
                params: { apiKey: this.apiKey },
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return removeDuplicates(response.data.ingredients, 'name');
    } catch (error) {
        console.error('Error fetching ingredients details:', error);
    }
}
//Get steps for a specific recipe
export const getSteps = async (recipeId) => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
            {
                params: { apiKey: this.apiKey },
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return response.data
    } catch (error) {
        console.error('Error fetching Steps details:', error);
    }
}
//Get nutrition facts for a specific recipe
export const getNutrients = async (recipeId) => {
    try {
        const res = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json`, {
            params: { apiKey: this.apiKey },
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}