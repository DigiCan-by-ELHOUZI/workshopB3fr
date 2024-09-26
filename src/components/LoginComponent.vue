<template>
    <div class="h-full">
        <div class="flex flex-col place-content-center items-center justify-center mt-48 h-full">
            <h1 class="text-[28px] font-bold text-black/80 mb-5">Room Finder</h1>
            <form @submit.prevent="login" class="flex flex-col items-center mt-10 w-full px-5">
                <div class="w-full">
                    <input class="input input-bordered input-info w-full bg-white text-black" type="email"
                         placeholder="Email" />
                </div>
                <div class="w-full">
                    <input class="input input-bordered input-info w-full bg-white text-black border-gray-300 mt-3"
                        type="password"  placeholder="Mot de passe" />
                </div>
                <p v-if="errorAuth" class="w-full text-start mt-2 text-red-500">Email ou mot de passe incorrect</p>
                <p v-if="errorLoad" class="w-full text-start mt-2 text-red-500">Email ou mot de passe incorrect</p>
                <p class="mt-5 w-full text-end">Mot de passe oublié</p>
                <button class="btn btn-primary text-white mt-5 w-full font-semibold" type="submit">Connexion</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getRooms, login } from '@/service/apiService';

export default {
    name: "LoginComponent",
    setup() {
        const router = useRouter();

        const handleLogin = async () => {
            router.push({ name: 'home' });      
        };

        return {
            login: handleLogin
        };
    }
}
</script>

