<template lang="pug">
.container
  .title.text-weight-bold.q-ma-md
    | {{ current.text }}
  .q-pa-md.row.items-start
    q-card.my-card(v-for="pic in pictures")
      q-img.picture(:src="pic.url",
                    :ratio="1",
                    transition="rotate")
      //- q-card-actions(align="around")
      //-   q-btn(flat, rround, color="red", icon="favorite")
      //-   q-btn(flat, rround, color="teal", icon="bookmark")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState: mapSatateOfDates
} = createNamespacedHelpers('dates')

export default {
  name: 'PageIndex',
  computed: {
    ...mapSatateOfDates(['current']),
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
  margin 8px

.picture
  +sp()
    width calc(50% - 16px)
  +pc()
    width 290px
</style>
