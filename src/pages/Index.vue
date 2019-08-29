<template lang="pug">
.container
  .title.text-weight-bold.q-ma-md
    | {{ current.text }}

  picture-list(:pictures="pictures", v-if="pictures && pictures.length > 0")

  image-card-dialog
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ImageCardDialog from '../components/ImageCardDialog'
import pictureList from '../components/PictureList'

const {
  mapState: mapSatateOfFolders
} = createNamespacedHelpers('folders')

export default {
  name: 'PageIndex',
  components: {
    ImageCardDialog,
    pictureList
  },
  computed: {
    ...mapSatateOfFolders(['current']),
    pictures: {
      get () {
        return this.$store.state.pictures.all
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
sp()
  @media screen and (max-width $breakpoint-xs-max)
    {block}

pc()
  @media screen and (min-width $breakpoint-xs-max)
    {block}

.title
  font-size 24px

.my-card
  margin 30px 10px

  +sp()
    width 40vw

  +pc()
    width 320px

.picture
  width 100%

</style>
