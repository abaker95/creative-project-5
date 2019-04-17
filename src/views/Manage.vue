<template>
  <div>
    <div v-if="user" class="header">
      <div>
        <h2>{{ user.name }}</h2>
      </div>
      <div class="button">
        <button @click="toggleAdd" class="pure-button pure-button-primary">
          Add Passage
        </button>
        <button @click="logout" class="pure-button pure-button-primary">
          Logout
        </button>
      </div>
      <div v-if="addView">
        <div class="heading">
          <h2>Add a new Passage</h2>
        </div>
        <div class="add">
          <div class="form">
            <input v-model="title" placeholder="Title" /><br />
            <input v-model="work" placeholder="Literary Work" /><br />
            <input v-model="author" placeholder="Author" /><br />
            <input v-model="speaker" placeholder="Passage speaker" /><br />
            <textarea
              v-model="passage"
              placeholder="Passage"
              rows="4"
              cols="32"
            ></textarea>
            <p></p>
            <button @click="addPassage">Upload</button
            ><button @click="cancel">Cancel</button>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <div>
            <div class="result" v-if="modified">
              Successfully added the record to the database
            </div>
          </div>
        </div>
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
  name: "manage",
  data() {
    return {
      title: "",
      passage: "",
      author: "",
      work: "",
      speaker: "",
      addView: false,
      modified: false,
      error: null
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    passages() {
      return this.$store.state.passages;
    }
  },
  async created() {
    this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyPassages");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    toggleAdd() {
      this.addView = true;
    },
    cancel() {
      this.addView = false;
    },
    async addPassage() {
      this.error = await this.$store.dispatch("addPassage", {
        title: this.title,
        passage: this.passage,
        author: this.author,
        work: this.work,
        speaker: this.speaker
      });
      if (this.error === "") {
        this.modified = true;
      }
    }
  }
};
</script>
