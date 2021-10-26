<template lang="pug">
  div
    v-alert(v-if="attempts>0" text outlined color="deep-orange" icon="mdi-fire") 
      | Por seguridad, solo tienes {{attempts}} intento(s). Después de esto tu cuenta sera bloqueada
    div.title
      h1 Afilia
        strong care
    div.initial
      v-card(class="mx-auto" max-width="500" :loading="loading" :disabled="disabled")
        v-card-title Recuperar acceso
        v-card-subtitle Introduce tu usuario. Para recibir código de recuperación
        div.container
          v-form(ref="form" v-model="valid" lazy-validation)
            v-text-field(v-model="username" :counter="50" :rules="usernameRules" label="Username" required)
            v-btn.btn(:disabled="!valid" :loading="loading" outlined color="deep-orange lighten-1" block class="mr-4" @click="sendCode") Recuperar
            div.go-back
              a(@click="goBack") Regresar
</template>

<script>
  export default {
    name: 'ForgetPassword',
    components: {
      // HelloWorld,
    },
    data: () => ({
      attempts: 1,
      forget: true,
      loading : false,
      disabled : false,
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
         v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ],
    }),
    mounted() {
      if(localStorage.token) {
        alert("You've not logged!")
      }
    },
    methods: {
      sendCode () {
        this.$refs.form.validate();
        if (
          /[\\@\\(\\)(select)\\*(from)\\;]/i.test(this.username)
          ||
          this.username.length < 3) {
            this.$refs.form.reset()
          return;
        }
        this.disabled = true;
        this.loading = true;
      },
      goBack () {
        this.$router.push("/login");
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
  .go-back {
    margin-top: 20px;
    text-align: right;
  }
</style>
