import axios from "axios";


export const createReservation = async (roomId, employeeName, startDateTime, endDateTime, userId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_CMS}/reservations`, roomId, employeeName, startDateTime, endDateTime, userId);
        return response;
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response : error
        );
        return {
            error: error.response
                ? error.response
                : "No se pudo completar la solicitud",
        };
    }
};
