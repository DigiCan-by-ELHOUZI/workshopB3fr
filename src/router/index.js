import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "@/components/HomeComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import ReservationComponent from "@/components/ReservationComponent.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
import CameraComponent from "@/components/CameraComponent.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        { 
            path: "/login", 
            component: LoginComponent 
        },
        { 
            path: "/home", 
            component: HomeComponent ,
            name: "home"
        },
        {
          path: '/profil',
          name: 'profil',
          component: ProfileComponent,
        },
        {
            path: '/camera',
            name: 'Camera',
            component: CameraComponent
        }
    ],
});

export default router;
