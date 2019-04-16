<template>
<div>
  <h1>{{passage.title}}</h1>
  <p>Passage uploaded by: {{passage.user.name}} | {{formatDate(passage.created)}}</p>
  <p>Description: {{passage.description}}</p>
  <img :src="photo.path" />
    <div v-if="user">
      <div >
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="addComment">
            <textarea v-model="userComment" cols="75" rows="4" placeholder="Your Comment"></textarea><br>
            <button type="submit" class="pure-button pure-button-secondary">Post</button>
          </form>
    </div>
    </div>
    <div v-else>
      <p>Please login to add a comment.</p>
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
    <!--Comments Here-->
    <hr>
    <p>{{comment.comment}}</p>
    <h4>-- {{comment.user.name}} | {{formatDate(comment.created)}} </h4>
  </div>
</div>

</template>

<script>
import moment from 'moment';
export default {
  name: 'Passage',
  data() {
    return {
      show: false,
      userComment: null,
      error: null
    }
  },
  async created() {
    let passageId = this.$route.params.id;
    console.log("ID: " + passageId);
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getPhotoById", passageId);
    await this.$store.dispatch("getPhotoComments", passageId);
    this.show = true;
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    passage() {
      return this.$store.state.passage;
    },
    comments() {
      return this.$store.state.comments.reverse();
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async addComment() {
      try {
        await this.$store.dispatch("postComment", {
          comment: this.userComment,
          user: this.user,
          photo: this.photo,
          date: Date.now()
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
h1 {
  color: maroon;
}
.comment p {
  color:maroon;
}
</style>