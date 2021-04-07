import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {createWebHashHistory, createRouter} from "vue-router"
import routes from './routes.js'
import './index.css'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
axios.defaults.baseURL = 'http://192.168.4.1/';

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app')