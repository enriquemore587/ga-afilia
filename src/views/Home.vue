<template lang="pug">
  v-card(color="pink")
    v-sheet(id="scrolling-techniques-3" class="overflow-y-auto" max-height="600")
    v-container(style="height: 1000px;")
      v-alert(class="importante" dense type="info") It is
        strong prototype 
        |to build our CRM
      v-img(:src="require('../assets/google.gif')" class="my-3" contain height="200")
</template>

<script>
import { mapMutations } from "vuex";
  export default {
    name: 'Home',

    components: {
    },
    methods: {
      ...mapMutations(["isLogged"]),
      deshabilitaRetroceso() {
        window.location.hash="no-back-button";
        window.location.hash="Again-No-back-button" //chrome
        window.onhashchange=function(){window.location.hash="";}
      }
    },
    mounted() {
    },
    beforeMount() {
      this.isLogged(this)
      this.deshabilitaRetroceso()
    }
  }
</script>
<style scoped>

</style>
