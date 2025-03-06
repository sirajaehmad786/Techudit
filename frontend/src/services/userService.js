import api from "./api";

export const registerCustomer = async (customerData) => {
  try {
    const response = await api.post("/user/user-register", customerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

export const registerAdmin = async (adminData) => {
    try {
      const response = await api.post("/user/admin-register", adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Something went wrong!";
    }
  };
  
  export const loginAdmin = async (adminData) => {
    try {
      const response = await api.post("/user/admin-login", adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Something went wrong!";
    }
  };
  