import Control from "./views/Control.vue"
import Art from "./views/Art.vue";
import Create from "./views/Create.vue"
import WiFi from "./views/Wifi.vue"

const routes = [
    {component: Control, path: '/', text: 'Control'},

    {component: Art, path: '/art', text: 'Art'},
    {component: Create, path: '/art/create', text: 'Create art', hidden: true},

    {component: WiFi, path: '/wifi', text: 'WiFi'},

]

export default routes;