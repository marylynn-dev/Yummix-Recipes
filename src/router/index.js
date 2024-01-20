/**
 * router.js
 *
 * Router configuration with NProgress integration.
 */

import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress settings
NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  minimum: 0.3,
  bar: {
    color: '#f15025', // Set the color of the NProgress bar to orange
  },
});

// Define your routes
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home.vue'),

      },
      {
        path: "/food-details/:recipeId/:recipeImg/:recipeTitle",
        name: 'food-details',
        component: () => import('../components/food-details'),
        props: (route) => {
          const id = route.params.recipeId;
          const img = route.params.recipeImg;
          const title = route.params.recipeTitle;
          return { id, img, title };
        },

      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/not-found.vue'),
      },
    ],
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Counter to track ongoing requests
let requestCounter = 0;

// Function to start NProgress if it's not already started
export const startNProgress = () => {
  if (requestCounter === 0) {
    NProgress.start();
  }
  requestCounter++;
};

// Function to decrement the counter and stop NProgress if no ongoing requests
export const stopNProgress = () => {
  requestCounter--;
  if (requestCounter === 0) {
    NProgress.done();
  }
};

// Navigation guard to start NProgress
router.beforeEach(() => {
  startNProgress();
});

// Navigation guard to end NProgress
router.afterEach(() => {
  stopNProgress();
});

// Export the router instance
export default router;
