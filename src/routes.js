import Dashboard from "./views/Dashboard.vue"
import Control from "./views/Control.vue"

const routes = [
    {component: Dashboard, path: '/', text: 'Dashboard'},
    {component: Control, path: '/control', text: 'Control'}
]

export default routes;