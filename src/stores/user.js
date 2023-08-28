import { defineStore } from "pinia";
import { sent } from "../apis/request";
export const useUserStore = defineStore("user", {
  state: () => ({}),
  actions: {
    listUser: async () => {
      const rep = await sent("/api/users", "GET");
      return rep.data;
    },

    userQr: async (userId) => {
      const repqr = await sent(`/api/users/${userId}/qrcode`, "GET");
      return repqr.data;
    },
    loginUser: async (loginData) => {
      try {
        if (!loginData.username || !loginData.password) {
          console.log("Vui lòng nhập đầy đủ thông tin đăng nhập");
          // throw new Error("Vui lòng nhập đầy đủ thông tin đăng nhập");
        }
        const response = await sent("/api/login", "POST", loginData);
        return response.data;
      } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        throw error;
      }
    },
  },
});