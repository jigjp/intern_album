<template lang="pug">
.container
  .title.text-weight-bold.q-ma-md
    | {{ current.text }}

  picture-list(:pictures="pictures", v-if="pictures && pictures.length > 0")

    //- div(v-masonry transition-duration="0.3s" item-selector=".item")
    //-   .item(v-masonry-tile class="item" v-for="(pic, index) in pictures")
    //- masonry.masonry(:cols="{default: 4, 700: 2}", :gutter="30")
    //-   q-card.my-card(clickable, v-for="pic in pictures", @click="onClick(pic)")
    //-     q-img.picture(:src="pic.thumbnailUrl",
    //-                   spinner-color="primary",
    //-                   spinner-size="82px")

  image-card-dialog
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Picker } from 'emoji-mart-vue'
import ImageCardDialog from '../components/ImageCardDialog'
import pictureList from '../components/PictureList'

const {
  mapState: mapSatateOfFolders
} = createNamespacedHelpers('folders')

export default {
  name: 'PageIndex',
  components: {
    Picker,
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
