<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white rounded-lg w-10/12 p-4 relative">
            <button @click="closeModal" class="absolute top-3 right-3 text-black">
                <X class="text-black/50 stroke-2" />
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { X } from 'lucide-vue-next';

export default {
    name: "ModalComponent",
    components: {
        X
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
/* Ajoute des styles si nécessaire */
</style>