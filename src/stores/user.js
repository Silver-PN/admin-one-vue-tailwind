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
  },
});
