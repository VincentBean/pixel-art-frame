import { createApp } from 'vue'
import App from './App.vue'
import {createWebHistory, createRouter} from "vue-router"
import routes from './routes.js'
import './index.css'

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')