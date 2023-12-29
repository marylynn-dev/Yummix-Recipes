/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import mitt from "mitt"

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter

registerPlugins(app)

app.mount('#app')


// 01001001 01100001 01110010 01111001 01101100 0111100 01101110 01101110
