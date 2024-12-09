import axios from "axios";


export const allReservation = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_CMS}/reservations`,);
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
