import { defineStore } from "pinia";
import { sent } from "../apis/request";

export const useContractStore = defineStore("contract", {
  state: () => ({}),
  actions: {
    listTodoList: async () => {
      const rep = await sent(
        "?channelid=mychannel&chaincodeid=basic&function=GetAllTodoItems",
        "GET"
      );
      return rep.data.data;
    },
  },
});
