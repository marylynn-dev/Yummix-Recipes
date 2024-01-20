/**
 * utils.js
 *
 * helper functions used in the store and anywhere in the project are defined here
 */

import Fraction from "@mathematics/fraction";

//convert the recipe amount values from decimals to fractions
export const convertToFraction = (decimal) => {
    // Convert decimal to fraction
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

//remove duplicate ingredients
export const removeDuplicates = (array, key) => {
    return array.filter(
        (item, index, self) => self.findIndex((t) => t[key] === item[key]) === index
    );
}

//add isFav property to all recipes from db
export const addIsFavProperty = (recipes) => {
    return recipes.map(recipe => ({ ...recipe, isFav: true }));
};