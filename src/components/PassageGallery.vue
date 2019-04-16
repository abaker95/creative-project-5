<template>
<div>
  <div class="passage" v-for="passage in passages" v-bind:key="passage._id">
    <p class="passageTitle">{{passage.title}}</p>
    <router-link :to="{ name: 'passage', params: { id: passage._id }}"></router-link>
    <p class="passageDate">
      <span v-if="passage.user.name">{{passage.user.name}}, </span>
      Uploaded {{formatDate(passage.created)}}
    </p>
    <p>Description: {{passage.description}}</p>
  </div>
</div>
</template>


<script>
import moment from 'moment';
import Passage from '@/views/Passage.vue';
export default {
  name: 'PassageGallery',
  props: {
    passages: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>

<style scoped>
.passageTitle {
  margin: 0px;
  font-size: 1.2em;
  color: maroon;
}
.passageDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}
p {
  margin: 0px;
}
.passage {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}
</style>