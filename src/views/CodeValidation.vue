<template lang="pug">
  div
    div
      v-card(class="mx-auto" max-width="300" :loading="loading" :disabled="disabled")
        v-stepper(style="margin: auto" value="2")
          v-stepper-header
            v-stepper-step(step="1" complete) Step one
            v-divider
            v-stepper-step(step="2") Password reset
            v-divider
            v-stepper-step(step="3") Password reset
        v-alert(v-if="showAlert" text outlined color="deep-orange" icon="mdi-fire") 
              | {{alertMsg}}
        v-card-title Proceso de recuperación de acceso
        v-card-subtitle Por favor escribe el número 
          b móvil 
          | asociado, así como el 
          b código 
          | que recibiste
        div.container
          v-form(ref="formReset" v-model="valid" lazy-validation)
            v-text-field(v-model="phoneNumber" type="password" :counter="10" :rules="phoneNumberRules" label="Mobile number" required)
            v-text-field(v-model="code" type="password" :counter="8" :rules="codeRules" label="Código de seguridad" required)
            v-btn.btn(:disabled="!valid" :loading="loading" outlined color="deep-orange lighten-1" block class="mr-4" @click="validate") Enviar
            div.go-back
              a(@click="goBack") Cancelar
</template>

<script>
import { mapMutations } from "vuex";
  export default {
    name: 'CodeValidation',
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
      phoneNumber: '',
      code: '',
      phoneNumberRules: [
        v => !!v || 'Mobile number is required',
         v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
         v => /[0-9]{10}/.test(v) || 'Mobile number must be valid'
      ],
      codeRules: [
        v => !!v || 'Code is required',
         v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
         v => /[0-9]{8}/.test(v) || 'Code must be valid'
      ],
    }),
    beforeMount() {
      if(localStorage.getItem('token') != null || localStorage.getItem('code') != 'sent') {
        this.clearToken()
        this.isLogged()
        this.$router.push("/");
        console.log('code validation journey is invalid');
      }
    },
    mounted() {
    },
    methods: {
      ...mapMutations(["clearToken", "isLogged"]),
      validate () {
        this.$refs.formReset.validate();
        if (
          this.phoneNumber.includes('@') || this.phoneNumber.includes('SELECT') || this.phoneNumber.includes('INNER')
          || this.phoneNumber.includes('(') || this.phoneNumber.includes(')')|| this.phoneNumber.includes('*')
          || this.phoneNumber.includes(';') || this.phoneNumber.length != 10) {
            this.$refs.formReset.reset()
          return;
        } else  if (
          this.code.includes('@') || this.code.includes('SELECT') || this.code.includes('INNER')
          || this.code.includes('(') || this.code.includes(')')|| this.code.includes('*')
          || this.code.includes(';') || this.code.length != 8) {
            this.$refs.formReset.reset()
          return;
        }
        let view = this;
        view.showAlert = false;
        view.disabled = true;
        view.loading = true;
        this.axios.post('/validate', { phoneNumber: this.phoneNumber, code: this.code }) 
        .then(function (response) {
          console.log(response);
          if(response.status === 200) {
            localStorage.setItem('reset', response.data.userId)
            view.$router.push("/reset-password")
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
