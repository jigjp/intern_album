<template lang="pug">
.container
  .title.text-weight-bold.q-ma-md
    | {{ current.text }}
  .q-pa-lg
    masonry.masonry(:cols="{default: 4, 700: 2}", :gutter="30")
      q-card.my-card(v-for="pic in pictures")
        img.picture(
          :src="pic.url",
                      :ratio="1",
                      transition="rotate")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState: mapSatateOfFolders
} = createNamespacedHelpers('folders')

export default {
  name: 'PageIndex',
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
