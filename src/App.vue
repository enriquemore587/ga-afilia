<template lang="pug">
  v-app
    //- MainBar(v-if="logged")
    v-main.container
      router-view
</template>

<script>
import MainBar from './components/MainBar.vue'
import { mapMutations, mapState } from "vuex";

export default {
  name: 'App',
  components: {
    MainBar
  },
  data: () => ({
    image: '../assets/logo_white.png'
  }),
  computed : {
    ...mapState(["logged"])
  },
  mounted() {
    if(localStorage.token) {
        alert("You've not logged!")
      }
  },
  methods : {
    ...mapMutations(["isLogged"]),
  },
  beforeMount() {
    this.isLogged(this)
  }
};
</script>
<style scoped>
.container {
  background-image:  url(./assets/doctor-login.jpg);
}
</style>