<template>
  <div>
    <h1>{{ passage.title }}</h1>
    <div class="container">
      <h3>"{{ passage.passage }}"</h3>
      <p>As quoted by: {{ passage.speaker }}</p>
      <p>In the work: {{ passage.work }}</p>
      <p>Which was written by: {{ passage.author }}</p>
      <p></p>
    </div>
    <div>
      <p>This passage was uploaded by:</p>
      <p>{{ passage.user.name }}</p>
      <p>{{ formatDate(passage.created) }}</p>
    </div>
    <div v-if="passage.user.username === user.username">
      <div>
        <h3>Delete this Passage?</h3>
        <p v-if="error" class="error">{{ error }}</p>
        <button @click="deletePassage" class="pure-button">Delete</button>
      </div>
    </div>
    <div v-else>
      <h3>Owners can login to remove</h3>
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Passage",
  data() {
    return {
      show: false,
      error: null
    };
  },
  async created() {
    let passageId = this.$route.params.id;
    console.log("ID: " + passageId);
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getPassageById", passageId);
    this.show = true;
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    passage() {
      return this.$store.state.passage;
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async deletePassage() {
      try {
        this.error = await this.$store.dispatch(
          "deletePassageById",
          this.passage._id
        );
        if (this.error === "") this.$router.push("manage");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
.container {
  border: 1px solid #ccc;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 20px;
}
</style>
