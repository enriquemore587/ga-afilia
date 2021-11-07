<template lang="pug">
  v-card(max-width="900" class="mx-auto")
    v-toolbar(color="grey darken-3" dark)
      v-toolbar-title Nuevos registros
      v-spacer
      p {{currentDate()}}
    v-list(subheader two-line)
      v-subheader(inset) Registro incompleto
      v-list-item(v-for="folder in folders" :key="folder.title")
        v-list-item-avatar
          v-icon(class="grey lighten-1" dark) mdi-account-circle
        v-list-item-content
          v-list-item-title(v-text="folder.title")
          v-list-item-subtitle(v-text="folder.subtitle")
        v-list-item-action
          v-btn(icon)
            v-icon(color="grey lighten-1") mdi-android-messages
      v-divider(inset)
      v-subheader(inset) Registro completo
      v-list-item(v-for="file in files" :key="file.title")
        v-list-item-avatar
          v-icon(:class="file.color" dark v-text="file.icon")
        v-list-item-content
          v-list-item-title(v-text="file.title")
          v-list-item-subtitle(v-text="file.subtitle")
        v-list-item-action
          v-btn(icon)
            v-icon(color="grey lighten-1") mdi-android-messages
</template>
<script>
  export default {
    name: "NewPatients",
    data: () => ({
      files: [
        {
          color: 'indigo lighten-1',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Jose Enrique Vergara Ambiriz',
        },
        {
          color: 'indigo lighten-1',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Uriel Morales Jimenez',
        },
      ],
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Brenda Sanchez Tamayo',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Daniel Hernandez',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Diego Carballido',
        },
      ],
    }),
    methods: {
      currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    }
    }
  }
</script>