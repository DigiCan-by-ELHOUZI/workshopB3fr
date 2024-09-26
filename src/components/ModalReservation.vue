<template>
    <ModalComponent :isOpen="isModalOpen" @close="closeModal">
        <div class="p-4">
            <h2 class="text-xl font-bold text-black/50">Réservation de la Salle {{ room.number }}</h2>
            <form class="mt-5" @submit.prevent="reserveRoom(room)">
                <div class="flex items-center">
                    <label for="appt1" class="mr-2">de</label>
                    <input type="time" id="appt1" v-model="startTime" name="appt1" min="09:00" max="18:00"
                        class="bg-white input input-bordered w-32 input-primary h-8 text-black/50" required>
                    <label for="appt2" class="mx-2">à</label>
                    <input type="time" id="appt2" v-model="endTime" name="appt2" min="09:00" max="18:00"
                        class="bg-white input input-bordered w-32 input-primary h-8 text-black/50" required>
                </div>

                <button class="btn btn-primary w-full text-white mt-5" type="submit">
                    Réserver cette salle
                </button>
            </form>
        </div>
    </ModalComponent>
</template>

<script>
import { addReservation, getRooms } from '@/service/apiService';
import ModalComponent from './ModalComponent.vue';

export default {
    name: "ModalReservation",
    components: {
        ModalComponent,
    },
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isModalOpen: true,
            startTime: '',
            endTime: '',
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.isModalOpen = false;
        },
        reserveRoom(room) {
            if (this.startTime && this.endTime) {
                const start = this.getDateTime(this.startTime);
                const end = this.getDateTime(this.endTime);
                this.addRoomReservation(start, end, room);
            }
        },
        getRoomStatus(room) {
            return !room.inLesson;
        },
        async addRoomReservation(start, end, room) {
            try {
                await addReservation(start, end, room.number, room.building.id);
                await this.loadRooms();
                this.$emit('update-rooms');
                this.closeModal();
            } catch (error) { }
        },
        getDateTime(time) {
            const today = new Date();
            const [hours, minutes] = time.split(':').map(Number);
            today.setHours(hours, minutes, 0, 0);
            return today;
        },
        async loadRooms() {
            try {
                await getRooms()
            } catch (error) {
                console.error('Une erreur est survenue lors de la récupération des rooms :', error);
            }
        }
    },
    watch: {
        room() {
            this.isModalOpen = true;
        }
    }
};
</script>
