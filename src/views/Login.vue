<template>
  <div>
    <h1>Login to your account</h1>
    <form @submit.prevent="login" class="pure-form pure-form-aligned">
      <fieldset>
        <div class="pure-control-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" placeholder="Username" />
        </div>

        <div class="pure-control-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" placeholder="Password" />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <div>
          <router-link to="/register">or Register Here</router-link>
        </div>

        <div class="pure-controls">
          <button type="submit" class="pure-button">
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      try {
        this.error = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        if (this.error === "") this.$router.push("manage");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
form {
  border: 1px solid #ccc;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 20px;
}

.pure-controls {
  display: flex;
}

.pure-controls button {
  margin-left: auto;
}

.error {
  color: red;
}
</style>
