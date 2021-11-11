<template lang="pug">
  div.home
    h1 ¡Hola {{name}}!
    h3 Este es el resumen al día de hoy
    h6 Último acceso - {{lastAccessDate}}
    div.resume
      v-container(class="grey lighten-5")
        v-row(class="mb-6" justify="center" dense)
          v-col(lg="4")
            v-card(class="mx-auto" height="150"  outlined)
              v-list-item(three-line)
                v-list-item-content
                  div(class="text-overline mb-4") Afilia | Pacientes
                  v-list-item-title(class="text-h5 mb-1") 350 usuarios
                  v-list-item-subtitle 150 por completar
                v-list-item-avatar(tile size="80" color="grey")
                  v-img(src="../assets/logo_white.png" max-height="125" contain class="grey darken-4")
          v-col(lg="4")
            v-card(class="mx-auto" height="150"  outlined)
              v-list-item(three-line)
                v-list-item-content
                  div(class="text-overline mb-4") Afilia | Doctores
                  v-list-item-title(class="text-h5 mb-1") 350 usuarios
                v-list-item-avatar(tile size="80" color="grey")
                  v-img(src="../assets/logo_white.png" max-height="125" contain class="grey darken-4")
          v-col(lg="4")
            v-card(class="mx-auto" height="150"  outlined)
              v-list-item(three-line)
                v-list-item-content
                  div(class="text-overline mb-4") Afilia | Enfermeras
                  v-list-item-title(class="text-h5 mb-1") 350 usuarios
                v-list-item-avatar(tile size="80" color="grey")
                  v-img(src="../assets/logo_white.png" max-height="125" contain class="grey darken-4")
    div
      NewPatients

</template>

<script>

import NewPatients from '../components/NewPatients.vue';
import { mapMutations, mapState } from "vuex";

  export default {
    name: 'Home',
    data : () => ({
      name: 'Hector',
      lastAccessDate: 'Ahora'
    }),
    computed : {
      ...mapState(["logged"])
    },
    components: {
      NewPatients
    },
    methods: {
      ...mapMutations(["clearToken", "isLogged"]),
      deshabilitaRetroceso() {
        window.location.hash="no-back-button";
        window.location.hash="Again-No-back-button" //chrome
        window.onhashchange=function(){window.location.hash="";}
      }
    },
    mounted() {
    },
    beforeMount() {
      this.isLogged()
      if (this.logged) {
        this.name = localStorage.getItem("name")
        this.lastAccessDate = localStorage.getItem("lastAccessDate")
        this.deshabilitaRetroceso() 
      } else {
        this.clearToken()
        this.isLogged()
        this.$router.push("/");
      }
    }
  }
</script>
<style scoped>
h1, h3, h6 {
  text-align: center;
}
h3 {
  color: #616161;
}
h6 {
  color: #BDBDBD;
}
.resume {
  
}
</style>
