import axios from "axios";


export const deleteReservation = async (id,userId) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_CMS}/reservations/${id}/${userId}`,);
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
