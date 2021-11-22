<template lang="pug">
  div
    div
      v-card(class="mx-auto" max-width="300" :loading="loading" :disabled="disabled")
        v-stepper(style="margin: auto" value="1")
            v-stepper-header
              v-stepper-step(step="1") Step one
              v-divider
              v-stepper-step(step="2") Write code
              v-divider
              v-stepper-step(step="3") Reset password
        v-alert(v-if="showAlert" text outlined color="deep-orange" icon="mdi-fire") 
              | {{alertMsg}}
        v-card-title Recuperar acceso
        v-card-subtitle Introduce tu usuario. Para recibir código de recuperación
        div.container
          v-form(ref="formReset" v-model="valid" lazy-validation)
            v-text-field(v-model="username" :counter="50" :rules="usernameRules" label="Username" required)
            v-btn.btn(:disabled="!valid" :loading="loading" outlined color="deep-orange lighten-1" block class="mr-4" @click="sendCode") Enviar
            div.go-back
              a(@click="goBack") Regresar
</template>

<script>
import { mapMutations } from "vuex";
  export default {
    name: 'ForgetPassword',
    components: {
    },
    data: () => ({
      attempts: 1,
      forget: true,
      loading : false,
      disabled : false,
      valid: true,
      showAlert: false,
      alertMsg: '',
      username: 'enriquevergara.ambriz',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ],
    }),
    mounted() {
      if(localStorage.getItem('token') != null) {
        this.clearToken()
        this.isLogged()
        this.$router.push("/");
      }
    },
    methods: {
      ...mapMutations(["clearToken", "isLogged"]),
      sendCode () {
        this.$refs.formReset.validate();
        if (
          this.username.includes('@') || this.username.includes('SELECT') || this.username.includes('INNER')
          || this.username.includes('(') || this.username.includes(')')|| this.username.includes('*')
          || this.username.includes(';') || this.username.length < 3) {
            this.$refs.formReset.reset()
          return;
        }
        let view = this;
        view.showAlert = false;
        view.disabled = true;
        view.loading = true;
        this.axios.post('/ms-login/access-reset', { userName: this.username }) //TODO: Cambiar a username
        .then(function (response) {
          console.log(response);
          if(response.status === 200) {
            localStorage.setItem('code', 'sent')
            view.$router.push("/code-validation")
          } else if(response.status === 400) {
            if (response.data.status == 'AF-ERR-ELK') {
              view.showAlert = true;
              view.disabled = false;
              view.loading = false;
              view.alertMsg =  `${response.data.status} | ${response.data.details}`;
            } else if (response.data.status == 'BAD-REQUEST') {//TODO: comentario. este estatus siempre será para cuando no se encuentre?
              view.disabled = false;
              view.loading = false;
              view.showAlert = true;
              view.alertMsg = `Usuario invalido`;
            }
          } 
        })
        .catch(function (error) {
          console.log(error);
          view.usrPwdIncorrect = true;
          view.userPwdMsg = 'La plataforma está fuera de servicio. Intentalo más tarde';
        });
      },
      goBack () {
        this.$router.push("/");
      },
    },
  }
</script>
<style scoped>
  * {
    font-family: 'Material Design Icons';
  }
  .btn {
    margin-top: 5px;
  }
  .go-back {
    margin-top: 20px;
    text-align: right;
  }
</style>
