<template lang="pug">
  v-card(class="container" style="margin-top: 300px")
    v-container
        v-row
            v-col(cols="12" md="4")
                v-text-field(v-model="state" filled color="blue-grey lighten-2" label="Estado")
            v-col(cols="12" md="4")
                v-text-field(v-model="ageFrom" filled color="blue-grey lighten-2" label="Edad inicial")
            v-col(cols="12" md="4")
                v-menu(ref="menuFrom" v-model="menuFrom" :close-on-content-click="false" :return-value.sync="dateFrom" transition="scale-transition" offset-y min-width="auto")
                    template(v-slot:activator="{ on, attrs }")
                        v-text-field(v-model="dateFrom" label="Fecha registro inicial" prepend-icon="mdi-calendar" filled v-bind="attrs" v-on="on")
                    v-date-picker(v-model="dateFrom" no-title scrollable)
                        v-spacer
                        v-btn(text color="primary" @click="menuFrom = false") Cancel
                        v-btn(text color="primary" @click="$refs.menuFrom.save(dateFrom)") OK
        v-row
            v-col(cols="12" md="4")
                v-text-field(v-model="municipio" filled color="blue-grey lighten-2" label="Municipio")
            v-col(cols="12" md="4")
                v-text-field(v-model="ageTo" filled color="blue-grey lighten-2" label="Edad final")
            v-col(cols="12" md="4")
                v-menu(ref="menuTo" v-model="menuTo" :close-on-content-click="false" :return-value.sync="dateTo" transition="scale-transition" offset-y min-width="auto")
                    template(v-slot:activator="{ on, attrs }")
                        v-text-field(v-model="dateTo" label="Fecha registro final" prepend-icon="mdi-calendar" filled readonly v-bind="attrs" v-on="on")
                    v-date-picker(v-model="dateTo" no-title scrollable)
                        v-spacer
                        v-btn(text color="primary" @click="menuTo = false") Cancel
                        v-btn(text color="primary" @click="$refs.menuTo.save(dateTo)") OK
    v-container
        UserDataTable
</template>
<script>
import UserDataTable from '../components/UserDataTable.vue'
import Dialog from '../components/Dialog.vue'

  export default {
    name: "Patients",
    components: {
        UserDataTable,
        Dialog
    },
    data: () => ({
        state: 'Estado de México',
        ageFrom : 'Todos',
        dateFrom: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        municipio: 'Ecatepec de Morelos',
        ageTo: 'Todos',
        dateTo: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menuFrom: false,
        menuTo: false,
        dialog: false,
     })
  }
</script>