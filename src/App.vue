<template>
  <div>
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="./assets/panel2.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
      height="100"
    >
      <v-img
          :src="require('./assets/logo_white.png')"
          class="my-3"
          contain
          height="20"
        />
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-spacer></v-spacer>
      
      <v-btn v-if="!login" icon>
        <v-icon>mdi-account-arrow-right</v-icon>
      </v-btn>

      <template v-if="!login" v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Inicio</v-tab>
          <v-tab>Afilia Pacientes</v-tab>
          <v-tab>Afilia Enfermeras</v-tab>
          <v-tab>Afilia Doctores</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <div :class="{ 'login-container': login }" style="min-height: 100vh;">
    <!-- style="width: 100%; height: 110px; background: #000;" -->
      <div style="height: 200px;"></div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import MainBar from './components/MainBar.vue'
// import { mapMutations, mapState } from "vuex";

export default {
  name: 'App',
  components: {
    // MainBar
  },
  data: () => ({
    image: '../assets/logo_white.png',
    login: false
  }),
  computed : {
    // ...mapState(["logged"])
  },
  mounted() {
    // if(localStorage.token) {
    //     alert("You've not logged!")
    //   }
  },
  methods : {
    // ...mapMutations(["isLogged"]),
  },
  beforeMount() {
    // this.isLogged(this)
  }
};
</script>
<style scoped>
 .login-container {
    background-image:  url(./assets/doctor-login.jpg);
  }
</style>