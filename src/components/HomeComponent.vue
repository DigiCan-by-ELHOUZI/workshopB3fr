<template>
  <div class="h-full">
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      <p>Chargement...</p>
    </div>

    <div v-else>
      <div class="p-4 mt-5 flex items-center">
        <img src="../assets/pdp.jpg" class="w-16 rounded-full h-16 object-cover" alt="">
        <div class="ml-4">
          <p class="font-bold text-black/70">Yanis Capelle</p>
          <p class="font-extrabold text-black/70 text-lg">Bienvenue sur Room Finder</p>
        </div>
      </div>
      <div v-for="room in rooms" :key="room.number" class="px-4 py-1">
        <div class="w-full bg-white py-3 rounded-xl pl-2 flex" @click="openReservationModal(room)">
          <div>
            <p class="text-black/70 flex items-center">
              <MapPinCheck class="mr-2 w-4 h-4" /> Salle {{ room.number }}, {{ ucfirst(room.building.number) }}
            <div v-if="getRoomStatus(room) || getReservationsCount(room) >= room.personLimit" class="badge badge-success gap-2 text-white ml-3">
              <Check class="h-5 w-5" /> Disponible
            </div>
            <div v-else class="badge badge-error gap-2 text-white ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="inline-block h-4 w-4 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Indisponible
            </div>
            </p>
            <p class="text-black/70 flex items-center" v-if="room.inLesson">
              <Users class="mr-2 w-4 h-4" />
              {{ room.personLimit }} / {{ room.personLimit }}
            </p>
            <p v-else class="text-black/70 flex items-center">
              <Users class="mr-2 w-4 h-4" />
              {{ getReservationsCount(room) }} / {{ room.personLimit }}
            </p>
          </div>
        </div>
      </div>
      <ModalReservation v-if="selectedRoom" :room="selectedRoom" ref="modalReservation" @update-rooms="loadRooms"/>
    </div>
  </div>
</template>

<script>
import { Check, MapPinCheck, Users } from 'lucide-vue-next';
import ModalReservation from './ModalReservation.vue';

export default {
  name: "HomeComponent",
  components: {
    MapPinCheck,  
    Users,
    Check,
    ModalReservation,
  },
  data() {
    return {
      userData: null,
      isLoading: false,
      rooms: [
  {
    "id": 1,
    "number": "111",
    "building": {
      "id": 1,
      "number": "batiment A"
    },
    "reservations": [
      {
        "id": 1,
        "dateStart": "2004-10-02T14:24:58+00:00",
        "dateEnd": "2004-10-02T12:00:00+00:00"
      },
      {
        "id": 2,
        "dateStart": "2004-10-02T10:00:00+00:00",
        "dateEnd": "2004-10-02T12:00:00+00:00"
      },
      {
        "id": 3,
        "dateStart": "2004-10-02T10:00:00+00:00",
        "dateEnd": "2004-10-02T12:00:00+00:00"
      },
      {
        "id": 4,
        "dateStart": "2004-10-02T10:00:00+00:00",
        "dateEnd": "2004-10-02T12:00:00+00:00"
      },
      {
        "id": 5,
        "dateStart": "2004-10-02T10:00:00+00:00",
        "dateEnd": "2004-10-02T12:00:00+00:00"
      },
      {
        "id": 6,
        "dateStart": "2004-10-02T10:00:00+00:00",
        "dateEnd": "2004-10-02T12:00:00+00:00"
      },
      {
        "id": 7,
        "dateStart": "2024-09-25T12:00:00+00:00",
        "dateEnd": "2024-09-25T14:00:00+00:00"
      },
      {
        "id": 8,
        "dateStart": "2004-10-02T10:00:00+00:00",
        "dateEnd": "2004-10-02T12:00:00+00:00"
      },
      {
        "id": 9,
        "dateStart": "2004-10-02T10:00:00+00:00",
        "dateEnd": "2004-10-02T12:00:00+00:00"
      }
    ],
    "inLesson": true,
    "personLimit": 30
  },
  {
    "id": 2,
    "number": "115",
    "building": {
      "id": 1,
      "number": "batiment A"
    },
    "reservations": [],
    "inLesson": true,
    "personLimit": 35
  },
  {
    "id": 3,
    "number": "112",
    "building": {
      "id": 1,
      "number": "batiment A"
    },
    "reservations": [
      {
        "id": 10,
        "dateStart": "2024-09-25T10:00:00+00:00",
        "dateEnd": "2024-09-25T13:00:00+00:00"
      },
      {
        "id": 11,
        "dateStart": "2024-09-25T09:00:00+00:00",
        "dateEnd": "2024-09-25T15:00:00+00:00"
      },
      {
        "id": 12,
        "dateStart": "2024-09-25T08:00:00+00:00",
        "dateEnd": "2024-09-25T15:00:00+00:00"
      },
      {
        "id": 13,
        "dateStart": "2024-09-25T08:00:00+00:00",
        "dateEnd": "2024-09-25T14:00:00+00:00"
      },
      {
        "id": 14,
        "dateStart": "2024-09-25T08:00:00+00:00",
        "dateEnd": "2024-09-25T15:00:00+00:00"
      },
      {
        "id": 15,
        "dateStart": "2024-09-25T08:00:00+00:00",
        "dateEnd": "2024-09-25T16:00:00+00:00"
      },
      {
        "id": 16,
        "dateStart": "2024-09-25T08:00:00+00:00",
        "dateEnd": "2024-09-25T16:00:00+00:00"
      },
      {
        "id": 17,
        "dateStart": "2024-09-25T08:00:00+00:00",
        "dateEnd": "2024-09-25T15:00:00+00:00"
      }
    ],
    "inLesson": false,
    "personLimit": 32
  },
  {
    "id": 4,
    "number": "119",
    "building": {
      "id": 1,
      "number": "batiment A"
    },
    "reservations": [],
    "inLesson": false,
    "personLimit": 36
  }
],
      selectedRoom: null,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    getUserDataFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
      }
      return null;
    },
    async loadData() {
      await this.loadUserData();
      await this.loadRooms();
      this.isLoading = false;
    },
    async loadUserData() {
      this.userData = this.getUserDataFromToken();
    },
    async loadRooms() {
      let rooms = localStorage.getItem('rooms');
      if (rooms) {
        this.rooms = JSON.parse(rooms);
      }
    },
    ucfirst(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    getRoomStatus(room) {
      return !room.inLesson;
    },
    openReservationModal(room) {
      if (!room.inLesson) {
        this.selectedRoom = room;
        this.$refs.modalReservation.isModalOpen = true;
      }
    },
    getReservationsCount(room) {
      const currentTime = new Date();
      let count = 0;

      for (const reservation of room.reservations) {
        const reservationStart = new Date(reservation.dateStart);
        const reservationEnd = new Date(reservation.dateEnd);

        if (currentTime >= reservationStart && currentTime < reservationEnd) {
          count++;
        }
      }

      return count;
    }

  },
};
</script>
