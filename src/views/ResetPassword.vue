<template lang="pug">
  div
    div
      v-alert(v-if="changed" style="margin: auto" max-width="600" shaped outlined type="success") Acceso restablecido
      v-card(v-if="!changed" class="mx-auto" max-width="600" :loading="loading" :disabled="disabled")
        v-stepper(style="margin: auto" value="3")
          v-stepper-header
            v-stepper-step(step="1" complete) Step one
            v-divider
            v-stepper-step(step="2" complete) Password reset
            v-divider
            v-stepper-step(step="3") Password reset
        v-alert(v-if="newPassword && confirmPassword && newPassword != confirmPassword" text outlined color="deep-orange" icon="mdi-fire") 
              | La contraseña no coincide
        v-card-title Proceso de recuperación de acceso
        v-card-subtitle Por favor escribe tu nueva contraseña.
        div.container
          v-form(ref="formReset" v-model="valid" lazy-validation)
            v-text-field(v-model="newPassword" type="password" :counter="10" :rules="newPasswordRules" label="Contraseña" required)
            v-text-field(v-model="confirmPassword" type="password" :counter="8" :rules="confirmPasswordRules" label="Confirmar contraseña" required)
            v-btn.btn(:disabled="!valid || newPassword != confirmPassword" :loading="loading" outlined color="deep-orange lighten-1" block class="mr-4" @click="validate") Enviar
</template>

<script>
import { mapMutations } from "vuex";
  export default {
    name: 'ResetPassword',
    components: {
    },
    data: () => ({
      changed: false,
      forget: true,
      loading : false,
      disabled : false,
      valid: true,
      newPassword: '',
      confirmPassword: '',
      newPasswordRules: [
        v => !!v || 'Password is required',
         v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
         v => /[0-9]{8}/.test(v) || 'Password must be longer than 8 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
         v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
         v => /[0-9]{8}/.test(v) || 'Password must be longer than 8 characters'
      ],
    }),
    beforeMount() {
      if(localStorage.getItem('token') != null || localStorage.getItem('code') != 'sent' || localStorage.getItem('reset') === null) {
        this.clearToken()
        this.isLogged()
        this.$router.push("/")
        console.log('reset password journey is invalid');
      }
    },
    mounted() {
    },
    methods: {
      ...mapMutations(["clearToken", "isLogged"]),
      validate () {
        this.$refs.formReset.validate();
        if (
          this.newPassword.includes('SELECT') || this.newPassword.includes('INNER')
          || this.newPassword.includes(';') || this.newPassword.length < 8) {
            this.$refs.formReset.reset()
          return;
        } else  if (
          this.confirmPassword.includes('SELECT') || this.confirmPassword.includes('INNER')
          || this.confirmPassword.includes(';') || this.confirmPassword.length < 8) {
            this.$refs.formReset.reset()
          return;
        }
        let view = this;
        view.showAlert = false;
        view.disabled = true;
        view.loading = true;
        this.axios.put(`/ms-login/access-update/${localStorage.getItem('reset')}`
              , { newPassword: this.newPassword, confirmPassword: this.confirmPassword })
        .then(function (response) {
          if(response.status === 200) {
            view.changed = true
            setTimeout(() => {
              view.clearToken()
              view.isLogged()
              view.$router.push("/")
            }, 3000);
          } else if(response.status === 400) {
            view.showAlert = true;
            view.disabled = false;
            view.loading = false;
            view.alertMsg =  `${response.data.status} | ${response.data.details}`;
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
