<template lang="pug">
  v-card
    v-sheet(id="scrolling-techniques-3" class="overflow-y-auto" max-height="600")
    v-container(style="height: 1000px;")
      v-alert(class="importante" dense type="info") It is
        strong prototype 
        |to build our CRM
      v-img(:src="require('../assets/google.gif')" class="my-3" contain height="200")
</template>

<script>
import { mapMutations } from "vuex";
import Swal from 'sweetalert2'

  export default {
    name: 'Home',

    components: {
    },
    methods: {
      ...mapMutations(["isLogged"]),
    },
    beforeMount() {
      this.isLogged(this)
    },
    mounted() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }
  }
</script>
<style scoped>

</style>
