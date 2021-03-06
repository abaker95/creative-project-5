import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    passages: [],
    passage: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPassages(state, passages) {
      state.passages = passages;
    },
    setPassage(state, passage) {
      state.passage = passage;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit("setUser", null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async addPassage(context, data) {
      try {
        await axios.post("/api/passages/", data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllPassages(context) {
      try {
        let response = await axios.get("/api/passages/all");
        context.commit("setPassages", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getMyPassages(context) {
      try {
        let response = await axios.get("/api/passages");
        context.commit("setPassages", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getPassageById(context, passageId) {
      try {
        let response = await axios.get("/api/passages/" + passageId);
        context.commit("setPassage", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async deletePassageById(context, passageId) {
      try {
        await axios.delete("/api/passages/" + passageId);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async editPassageById(context, data) {
      try {
        console.log(data.passageId);
        let passageId = data.passageId;
        await axios.put("/api/passages/" + passageId, data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    }
  }
});
