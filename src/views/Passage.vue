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
    <div v-if="user">
      <div v-if="passage.user.username === user.username">
        <div>
          <h3>Delete or Edit this Passage?</h3>

          <div v-if="show">
            <button @click="deletePassage" class="pure-button">Delete</button>
            <button @click="toggleEditView" class="pure-button">Edit</button>
          </div>
          <div v-else>
            <form
              @submit.prevent="editPassage"
              class="form pure-form pure-form-aligned"
            >
              <div class="heading">
                <h2>Change Passage or Speaker</h2>
              </div>
              <fieldset>
                <div class="pure-control-group">
                  <label for="newpassage">Change Passage</label>
                  <input
                    v-model="newpassage"
                    type="text"
                    placeholder="Passage"
                  />
                </div>
                <div class="pure-control-group">
                  <label for="newspeaker">Change Speaker</label>
                  <input
                    v-model="newspeaker"
                    type="text"
                    placeholder="Speaker"
                  />
                </div>
                <p v-if="error" class="error">{{ error }}</p>
                <div class="result" v-if="modified">
                  Successfully updated the record in the database
                  <p></p>
                </div>

                <button type="submit" class="pure-button">
                  Submit
                </button>
                <button
                  @click="toggleEditView"
                  type="button"
                  class="pure-button"
                >
                  Cancel
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div v-else>
        <h3>Owners can login to remove</h3>
        <router-link to="/login" class="pure-button">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Passage",
  data() {
    return {
      show: true,
      error: null,
      newpassage: "",
      newspeaker: "",
      modified: false
    };
  },
  async created() {
    let passageId = this.$route.params.id;
    console.log("ID: " + passageId);
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getPassageById", passageId);
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
    toggleEditView() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
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
    },
    async editPassage() {
      try {
        this.error = await this.$store.dispatch("editPassageById", {
          passage: this.newpassage,
          speaker: this.newspeaker,
          passageId: this.passage._id
        });
        if (this.error === "") {
        this.modified = true;
      }
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
