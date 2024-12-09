import axios from "axios";

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_CMS}/auth`, {
      email,
      password,
    });
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
