<template lang="pug">
    div
        v-text-field(v-model="search" append-icon="mdi-magnify" filled label="Search" single-line hide-details)
        v-data-table(:headers="headers" :items="desserts" :items-per-page="5" class="elevation-1" :search="search")
</template>
<script>
  export default {
    name: 'UserDataTable',
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Nombre',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Fecha de ingreso', value: 'calories' },
          { text: 'Número telefónico', value: 'fat' },
          { text: 'Edad', value: 'carbs' },
          { text: 'Estado', value: 'protein' },
          { text: 'Municipio', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Jose Enrique Vergara Ambriz',
            calories: '2021-04-21',
            fat: '5522301124',
            carbs: 24,
            protein: 'Estado de México',
            iron: 'Ecatepec de Morelos',
          },
          {
            name: 'Uriel Morales Jimenez',
            calories: '2021-04-21',
            fat: '56678908',
            carbs: 24,
            protein: 'Estado de México',
            iron: 'Nezahualcoyotl',
          },
          {
            name: 'Luiz Daniel Villanueva Garcia',
            calories: '2021-04-21',
            fat: '5522301124',
            carbs: 24,
            protein: 'Estado de México',
            iron: 'Ecatepec de Morelos',
          },
          {
            name: 'Tania Benitez Rodriguez',
            calories: '2021-04-21',
            fat: '5522301124',
            carbs: 24,
            protein: 'Estado de México',
            iron: 'Ecatepec de Morelos',
          },
          {
            name: 'Jose Daniel Hernandez',
            calories: '2021-04-21',
            fat: '5522301124',
            carbs: 24,
            protein: 'Ciudad de México',
            iron: 'Miguel Hidalgo',
          },
          {
            name: 'Jose Enrique Vergara Ambriz',
            calories: '2021-04-21',
            fat: '5522301124',
            carbs: 24,
            protein: 'Estado de México',
            iron: 'Ecatepec de Morelos',
          },
          {
            name: 'Jose Enrique Vergara Ambriz',
            calories: '2021-04-21',
            fat: '5522301124',
            carbs: 24,
            protein: 'Estado de México',
            iron: 'Ecatepec de Morelos',
          },
          {
            name: 'Jose Enrique Vergara Ambriz',
            calories: '2021-04-21',
            fat: '5522301124',
            carbs: 24,
            protein: 'Estado de México',
            iron: 'Ecatepec de Morelos',
          },
          {
            name: 'Jose Enrique Vergara Ambriz',
            calories: '2021-04-21',
            fat: '5522301124',
            carbs: 24,
            protein: 'Estado de México',
            iron: 'Ecatepec de Morelos',
          }
        ],
      }
    },
  }
</script>