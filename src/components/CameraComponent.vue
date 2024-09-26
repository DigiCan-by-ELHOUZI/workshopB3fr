<template>
    <div class="relative w-full min-h-screen bg-black flex justify-center items-center">
        <button @click="goBack" class="absolute top-5 left-5 bg-white text-black p-2 rounded-full">
            <ChevronLeft class="h-6 w-6" />
        </button>
        
        <video ref="video" class="h-auto w-full" autoplay></video>
    </div>
</template>

<script>
import { ChevronLeft } from 'lucide-vue-next';

export default {
    name: "CameraComponent",
    components: {
        ChevronLeft
    },
    data() {
        return {
            stream: null,
        };
    },
    mounted() {
        this.openCamera();
    },
    methods: {
        async openCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.stream = stream;

                this.$nextTick(() => {
                    if (this.$refs.video) {
                        this.$refs.video.srcObject = stream;
                    } else {
                        console.error('Référence vidéo introuvable');
                    }
                });
            } catch (error) {
                console.error('Erreur lors de l\'ouverture de la caméra :', error);
            }
        },
        closeCamera() {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }
        },
        goBack() {
            this.closeCamera();
            this.$router.back();
        }
    },
    beforeDestroy() {
        this.closeCamera();
    }
};
</script>

<style scoped>
video {
    object-fit: cover;
}
</style>
