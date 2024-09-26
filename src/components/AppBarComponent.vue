<template>
    <nav class="bg-white text-black fixed bottom-0 inset-x-0 p-2 rounded-3xl">
        <ul class="flex justify-around items-center">
            <li>
                <router-link to="/home" class="hover:text-indigo-500 text-black/50">
                    <House class="h-10 w-10" />
                </router-link>
            </li>
            <li>
                <router-link to="/camera" class="relative bottom-5 rounded-full h-20 w-20 flex place-content-center items-center text-white bg-indigo-500">
                    <Camera class="h-8 w-8" />
                </router-link>
            </li>
            <li>
                <router-link to="/profil" class="hover:text-indigo-500 text-black/50">
                    <User class="h-10 w-10" />
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { Camera, House, User } from 'lucide-vue-next';

export default {
    name: "AppBarComponent",
    components: {
        House,
        Camera,
        User,
    }
};
</script>
