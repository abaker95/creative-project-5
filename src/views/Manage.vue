<template>
  <div>
    <div v-if="user" class="header">
      <div>
        <h1>Welcome, {{ user.name }}</h1>
      </div>
      <div v-if="addView === false">
        <button @click="toggleAdd" class="pure-button">
          Add Passage
        </button>
      </div>
      <div v-if="addView">
        <form
          @submit.prevent="addPassage"
          class="form pure-form pure-form-aligned"
        >
          <div class="heading">
            <h2>Add a new Passage</h2>
          </div>
          <fieldset>
            <div class="pure-control-group">
              <label for="title">Title</label>
              <input v-model="title" type="text" placeholder="Title" />
            </div>
            <div class="pure-control-group">
              <label for="work">Work</label>
              <input v-model="work" type="text" placeholder="Work" />
            </div>
            <div class="pure-control-group">
              <label for="author">Author</label>
              <input v-model="author" type="text" placeholder="Author" />
            </div>
            <div class="pure-control-group">
              <label for="speaker">Speaker</label>
              <input
                v-model="speaker"
                type="text"
                placeholder="Passage speaker"
              />
            </div>

            <div class="pure-control-group">
              <label for="passage">Passage</label>
              <textarea v-model="passage" type="text" placeholder="Passage" />
            </div>
            <p v-if="error" class="error">{{ error }}</p>
            <div class="result" v-if="modified">
              Successfully added the record to the database
              <p></p>
            </div>

            <button type="submit" class="pure-button">
              Submit
            </button>
            <button @click="cancel" type="button" class="pure-button">
              Cancel
            </button>
          </fieldset>
        </form>
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

<style>
form {
  border: 1px solid #ccc;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 20px;
}
.error {
  color: red;
}
.result {
  color: green;
}
input:focus,
textarea:focus {
  border-radius: 5px;
  border-color: rgb(93, 178, 247);
}
</style>
