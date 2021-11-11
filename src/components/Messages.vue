<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-card-title
      class="blue-grey white--text"
    >
      <span class="text-h6">Historial de mensajes</span>
    </v-card-title>
    <v-card-text class="py-0">
      <v-timeline dense>
        <v-slide-x-reverse-transition
          group
          hide-on-leave
        >
          <v-timeline-item
            v-for="item in items"
            :key="item.id"
            :color="item.color"
            small
            fill-dot
          >
            <v-alert
              :value="true"
              :color="item.color"
              :icon="item.icon"
              class="white--text"
            >
              2021-09-21 | Hola, <b>Nombre del usuario</b>. Los beneficios de crear una cuenta con nosotros.......
            </v-alert>
          </v-timeline-item>
        </v-slide-x-reverse-transition>
      </v-timeline>
      <TextBox></TextBox>
    </v-card-text>
  </v-card>
</template>
<script>
import TextBox from './TextBox.vue'
  const COLORS = [
    'info',
    'warning',
    'error',
    'success',
  ]
  const ICONS = {
    info: 'mdi-information',
    warning: 'mdi-alert',
    error: 'mdi-alert-circle',
    success: 'mdi-check-circle',
  }

  export default {
      name: 'Messages',
      components: {
        TextBox
      },
    data: () => ({
      interval: null,
      items: [
        {
          id: 1,
          color: 'info',
          icon: ICONS.info,
        },
      ],
      nonce: 2,
    }),

    beforeDestroy () {
      this.stop()
    },

    methods: {
      addEvent () {
        let { color, icon } = this.genAlert()

        const previousColor = this.items[0].color

        while (previousColor === color) {
          color = this.genColor()
        }

        this.items.unshift({
          id: this.nonce++,
          color,
          icon,
        })

        if (this.nonce > 6) {
          this.items.pop()
        }
      },
      genAlert () {
        const color = this.genColor()

        return {
          color,
          icon: this.genIcon(color),
        }
      },
      genColor () {
        return COLORS[Math.floor(Math.random() * 3)]
      },
      genIcon (color) {
        return ICONS[color]
      },
      start () {
        this.interval = setInterval(this.addEvent, 3000)
      },
      stop () {
        clearInterval(this.interval)
        this.interval = null
      },
    },
  }
</script>