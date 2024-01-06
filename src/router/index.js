// Composables

// Importing necessary functions from vue-router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: "/food-details/:recipeId/:recipeImg/:recipeTitle",
        name: 'food-details',
        component: () => import('../components/FoodDetails.vue'),
        // Passing route params as props to the component
        props: (route) => {
          const id = route.params.recipeId
          const img = route.params.recipeImg
          const title = route.params.recipeTitle
          return { id, img, title }
        }
      }
    ],
  },
]

// Creating a router instance with web history mode
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Exporting the router instance
export default router
