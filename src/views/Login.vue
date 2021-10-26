<template lang="pug">
  div
    v-alert(v-if="accountBlocked" text outlined color="deep-orange" icon="mdi-fire") 
      | {{accountBlockedMsg}}
    v-alert(v-if="usrPwdIncorrect" type="info")
      | {{userPwdMsg}}
    div.title
      h1 Afilia
        strong care
    div.initial
      v-card(class="mx-auto" max-width="500" :loading="loading" :disabled="disabled")
        v-card-title Acceso
        v-card-subtitle Introduce tus datos para acceder
        div.container
          v-form(ref="form" v-model="valid" lazy-validation)
            v-text-field(v-model="username" :counter="50" :rules="usernameRules" label="Username" required)
            v-text-field(v-model="password" :rules="passwordRules" type="password" label="Password" required)
            v-btn.btn(:disabled="!valid" :loading="loading" depressed color="primary" block class="mr-4" @click="validate") Entrar
            v-btn.btn(text color="blue darken-1" block @click="accessReset") Olvide mi contraseña
</template>

<script>
import { mapMutations } from "vuex";

  export default {
    name: 'Login',
    components: {
      // HelloWorld,
    },
    data: () => ({
      forget: true,
      loading : false,
      disabled : false,
      accountBlocked: false,
      usrPwdIncorrect: false,
      userPwdMsg: 'Usuario y/o Contraseña incorrectos',
      accountBlockedMsg: 'Limite de intentos superado, la cuenta ha sido bloqueada',
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
         v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ],
      password: '',
      passwordRules : [
        v => !!v || 'Password is required'
      ]
    }),
    beforeUpdate() {
      this.isLogged(this)
    },
    beforeMount() {
      this.clearToken()
    },
    mounted() {
    },
    methods: {
      ...mapMutations(["clearToken", "isLogged"]),
      validate () {
        this.$refs.form.validate();
        this.username = this.username.toUpperCase();
        if (
          this.username.includes('@') || this.username.includes('SELECT') || this.username.includes('INNER')
          || this.username.includes('(') || this.username.includes(')')|| this.username.includes('*')
          || this.username.includes(';') || this.username.length < 3
          || this.password.length < 8) {
            this.$refs.form.reset()
          return;
        }
        let view = this;
        view.accountBlocked = false;
        view.usrPwdIncorrect = false;
        this.axios.post('/access', { username: this.username, password: this.password})
        .then(function (response) {
          if(response.status === 200) {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("lastAccessDate", response.data.lastAccessDate)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("usermane", response.data.usermane)
            view.disabled = true;
            view.loading = true;
            setTimeout(() => {
              view.$router.push("/home")
            }, 5000);
          } else if(response.status === 401) {
            if (response.data.status == 'AF-BLOCKED') {
              view.accountBlocked = true;
              view.disabled = false;
              view.loading = false;
              view.accountBlockedMsg = response.data.details;
            } else if (response.data.status == 'AF-USER-PWD') {
              view.usrPwdIncorrect = true;
              view.userPwdMsg = response.data.details;
            }
          }
        })
        .catch(function (error) {
          console.log(error);
          view.usrPwdIncorrect = true;
          view.userPwdMsg = 'La plataforma está fuera de servicio. Intentalo más tarde';
        });
      },
      accessReset () {
        this.$router.push("/forget-password");
      },
    },
  }
</script>
<style scoped>
  * {
    font-family: 'Material Design Icons';
  }
  .title {
    margin-top: 80px;
    text-align: center;
  }
  .initial {
    margin-top: 70px;
  }
  .btn {
    margin-top: 5px;
  }
</style>
