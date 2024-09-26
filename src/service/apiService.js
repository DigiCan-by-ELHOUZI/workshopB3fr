import axios from "axios";
import { apiUrl } from "../../config";
import VueJwtDecode from "vue-jwt-decode";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${apiUrl}/api/login_check`, {
            username: email,
            password: password,
        });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "tokenData",
                JSON.stringify(VueJwtDecode.decode(response.data.token))
            );
            return response.data.token;
        } else {
            throw new Error("Token non reçu");
        }
    } catch (error) {
        console.error(
            "Erreur lors de la connexion:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const getRooms = async () => {
    try {
        let tokenData = JSON.parse(localStorage.getItem("tokenData"));
        let token = localStorage.getItem("token");
        let campusId = tokenData.campus_id;

        const response = await axios.post(
            `${apiUrl}/api/get-rooms`,
            {
                campusId: campusId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data) {
            localStorage.setItem("rooms", JSON.stringify(response.data));
            return response.data;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des salles :", error);
        throw error;
    }
};

export const addReservation = async (start, end, roomNumber, buildingId) => {
    try {
        let token = localStorage.getItem("token");
        let tokenData = JSON.parse(localStorage.getItem("tokenData"));
        let userId = tokenData.user_id;

        const response = await axios.post(`${apiUrl}/api/add-reservation`, {
            dateStart: start,
            dateEnd: end,
            roomNumber: roomNumber,
            buildingId: buildingId,
            userId: userId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la reservation :", error);
        throw error;
    }
};

export const getReservations = async () => {
    try {
        let token = localStorage.getItem("token");
        let tokenData = JSON.parse(localStorage.getItem("tokenData"));
        let userId = tokenData.user_id;

        
        const response = await axios.post(`${apiUrl}/api/get-reservations`, {
            userId: userId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data) {
            localStorage.setItem("reservations", JSON.stringify(response.data));
            return response.data;
        }
    } catch (error) {
        console.error("erreur lors de la récupération des reservations : ", error);
        throw error
    }
}
