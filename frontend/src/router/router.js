import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Main from "@/views/Main.vue";
import BarChart from "@/components/BarChart.vue";
import Admin from "@/views/Admin.vue";
const routes = [
    { path: '/', name: 'Login', component: Login },
    {path:'/broker/:id',name:'Main',component:Main},
    {path: '/admin',name: 'Admin',component: Admin}
]
const router = createRouter({ history: createWebHashHistory(), routes
})
export default router