<template lang="pug">
  v-card
    MainBar(v-if="true")
    v-sheet(id="scrolling-techniques-3" class="overflow-y-auto" max-height="600")
    v-container(style="height: 1000px;")
      v-alert(class="importante" dense type="info") It is
        strong prototype 
        |to build our CRM
      v-img(:src="require('../assets/google.gif')" class="my-3" contain height="200")
</template>

<script>
import { mapMutations } from "vuex";
import MainBar from '../components/MainBar.vue'
  export default {
    name: 'Home',

    components: {
      MainBar
    },
    methods: {
      ...mapMutations(["isLogged"]),
    },
    mounted() {
    },
    beforeMount() {
      this.isLogged(this)
    }
  }
</script>
<style scoped>

</style>
