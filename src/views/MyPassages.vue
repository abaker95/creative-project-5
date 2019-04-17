<template>
  <div class="home">
    <passage-gallery :passages="passages" />
  </div>
</template>

<script>
// @ is an alias to /src
import PassageGallery from "@/components/PassageGallery.vue";
export default {
  name: "home",
  components: {
    PassageGallery
  },
  computed: {
    passages() {
      return this.$store.state.passages;
    }
  },
  async created() {
    await this.$store.dispatch("getMyPassages");
  }
};
</script>
