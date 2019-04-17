import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Manage from "./views/Manage.vue";
import Login from "./views/Login.vue";
import Passage from "./views/Passage.vue";
import MyPassages from "./views/MyPassages.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/passage",
      name: "passage",
      component: Passage
    },
    {
      path: "/mypassages",
      name: "mypassages",
      component: MyPassages
    }
  ]
});
