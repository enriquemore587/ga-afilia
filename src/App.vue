<template lang="pug">
  v-app
    v-card(class="overflow-hidden" )
      v-app-bar(absolute color="#6A76AB" dark shrink-on-scroll prominent src="./assets/panel2.jpg" fade-img-on-scroll scroll-target="#scrolling-techniques-3")
        template(v-slot:img="{ props }")
          v-img(v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)")
        v-img(:src="require('./assets/logo_white.png')" class="my-3" contain height="20")
        v-tooltip(v-if="logged" bottom)
          template(v-slot:activator="{ on, attrs }")
            v-btn(icon v-bind="attrs" v-on="on")
              v-icon mdi-account-arrow-right
          span Cerrar sesión
        template(v-if="logged" v-slot:extension)
          v-tabs(align-with-title)
            v-tab Inicio
            v-tab Afilia Pacientes
            v-tab Afilia Enfermeras
            v-tab Afilia Doctores
      v-sheet(id="scrolling-techniques-3" class="overflow-y-auto" color="grey lighten-5" max-height="900")
        div(style="min-height: 1000px; margin-top: 250px")
          //- v-container(style="height: 1000px; padding: 200px")
          router-view
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: 'App',
  components: {
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
/* .container {
  background-image:  url(./assets/doctor-login.jpg);
} */
</style>