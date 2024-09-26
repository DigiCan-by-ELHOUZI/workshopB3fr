<template>
    <div class="p-5">
        <h1 class="text-2xl font-bold text-black/70">Mes réservations</h1>
        <div v-if="reservations.length" class="mt-8">
            <div v-for="reservation in reservations" :key="reservation.id">
                <div class="h-20 bg-white mt-2 rounded-xl p-2 flex flex-col place-content-center">
                    <div class="flex justify-between">
                        <p class="text-black/60">
                            Salle : {{ reservation.room.number }}, {{ reservation.room.building.number }}
                        </p>
                        <Trash  class="stroke-red-500"/>
                    </div>
                    <p class="text-black/60">
                        De {{ formatDate(reservation.dateStart) }} à {{ formatDate(reservation.dateEnd) }}
                    </p>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="mt-20 text-center font-semibold text-black/50">Aucun réservations en cours</p>
        </div>
    </div>
</template>

<script>
import { Trash } from 'lucide-vue-next';

export default {
    name: "ProfileComponent",
    data() {
        return {
            reservations: [  {
    "id": 1,
    "room": {
      "number": "111",
      "building": {
        "id": 1,
        "number": "batiment A"
      }
    },
    "dateStart": "2004-10-02T14:24:58+00:00",
    "dateEnd": "2004-10-02T12:00:00+00:00"
  },],
        }
    },
    components: {
        Trash,
    },
    methods: {
        formatDate(dateString) {
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', options);
        }
    },
}
</script>
