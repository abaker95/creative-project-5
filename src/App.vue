<template>
  <div id="app">
    <div class="pure-menu pure-menu-horizontal">
      <div class="pure-menu-heading">BRAND</div>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link to="/" class="pure-menu-link">Home</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/about" class="pure-menu-link">About</router-link>
        </li>
        <li class="pure-menu-item">
          <a
            class="pure-menu-link"
            href="https://github.com/abaker95/creative-project-5"
            >Github</a
          >
        </li>
        <li class="pure-menu-item">
          <div v-if="user">
            <router-link to="/manage" class="pure-menu-link"
              >Manage</router-link
            >
          </div>
        </li>
        <li class="pure-menu-item">
          <div v-if="user">
            <div @click="logout" class="pure-menu-link">Sign Out</div>
          </div>
          <div v-else>
            <router-link to="/login" class="pure-menu-link"
              >Sign In</router-link
            >
          </div>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
        if (this.error === "") this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.pure-menu {
  /* To limit the menu width to the content of the menu: */
  /* display: inline-block; */
  /* Or set the width explicitly: */
  text-align: left;
  background: #000;
}

.pure-menu-heading {
  color: #fff;
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: rgb(242, 183, 56);
  margin-right: 2px;
}

.pure-menu-link {
  color: #fff;
  padding: 10px 20px;
  font-weight: 800;
}

.pure-menu-link:hover {
  background: #333;
}

.pure-menu-link.router-link-exact-active {
  background: #fff;
  color: rgb(242, 183, 56);
}
</style>
