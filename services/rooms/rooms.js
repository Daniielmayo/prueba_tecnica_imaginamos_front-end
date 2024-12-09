import axios from "axios";

export const allRoomsService = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_CMS}/rooms`);
    return response;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data.message : error.message
    );
    return {
      error: error.response
        ? error.response.data.message
        : "No se pudo completar la solicitud",
    };
  }
};
