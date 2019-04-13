<template>
<div>
  <div v-if="user" class="header">
    <div>
      <h2>{{user.name}}</h2>
    </div>
    <div class="button">
      <p><button @click=" logout" class="pure-button pure-button-primary">Logout</button></p>
    </div>
  </div>
  <div v-else>
    <!--consider adding a redirect here back to the main page-->
    <p>Please login if you want to access this page</p>
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'manage',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>