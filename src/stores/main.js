import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
  }),
  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
    },

    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    async fetchItems() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        this.clients = response.data; // Cập nhật state clients
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
});
