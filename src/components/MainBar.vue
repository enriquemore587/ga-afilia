<template lang="pug">
  //- v-card
  v-app-bar(absolute color="#6A76AB" dark shrink-on-scroll prominent :src="require('../assets/panel2.jpg')" fade-img-on-scroll scroll-target="#scrolling-techniques-3")
    template(v-slot:img="{ props }")
      v-img(v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)")
    v-app-bar-nav-icon
    v-spacer
    v-btn(icon)
      v-icon mdi-magnify
    v-btn(href="https://www.afiliacare.com.mx/" target="_blank" text) Cerrar sesión
    v-btn(icon)
      v-icon mdi-account-circle
    template(v-slot:extension)
      v-tabs(align-with-titl)
        v-tab Afiliacare
        v-tab Afilianurse
        v-tab AfiliaMD
        v-tab Messages
  //- v-sheet(id="scrolling-techniques-3" class="overflow-y-auto" max-height="600")
  //-   v-container(style="height: 1000px;")
    //- (app color="primary" dark)
    //- div(class="d-flex align-center")
    //- v-img(alt="Vuetify Logo" class="shrink mr-2" contain :src="require('../assets/logo_white.png')" transition="scale-transition" width="150")
    //- v-spacer
    //- v-btn(href="https://www.afiliacare.com.mx/" target="_blank" text) Cerrar sesión
    //- v-avatar(color="light-blue accent-1")
    //-   v-icon(dark) mdi-account-circle
    //- span(class="mr-2") See more
    //- v-icon mdi-open-in-new
</template>

<script>

export default {
  name: 'MainBar',

  data: () => ({
    //
  }),
};
</script>