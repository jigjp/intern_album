<template lang="pug">
q-dialog(v-model="dialogOpen")
  q-card
    img(:src="picture.url")

</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState: mapStateOfImageCardDialog,
  mapMutations: mapMutationsOfImageCardDialog
} = createNamespacedHelpers('imageCardDialog')

export default {
  components: {
  },
  computed: {
    ...mapStateOfImageCardDialog(['picture']),
    dialogOpen: {
      get () {
        return this.$store.state.imageCardDialog.dialogOpen
      },
      set (value) {
        this.setDialogOpen(value)
      }
    }
  },
  methods: {
    ...mapMutationsOfImageCardDialog(['setDialogOpen'])
  }
}
</script>

<style lang="stylus">
.image
  width 300px

.my-card-section
  width 300px
</style>
