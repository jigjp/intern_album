<template lang="pug">
.q-pa-lg
  .flex
    .item(class="item" v-for="(pic, index) in pictures", :key="index")
      img.picture(:src="pic.thumbnailUrl",
                  loading="lazy",
                    spinner-color="primary",
                    spinner-size="82px")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapMutations: mapMutationsOfImageCardDialog
} = createNamespacedHelpers('imageCardDialog')

export default {
  props: ['pictures'],
  methods: {
    ...mapMutationsOfImageCardDialog(['setPicture', 'setDialogOpen']),
    onClick (pic) {
      this.setPicture(pic)
      this.setDialogOpen(true)
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
.my-card
  margin 30px 10px

  +sp()
    width 40vw

  +pc()
    width 320px

.picture
  +sp()
    width 40vw

  +pc()
    width 320px
</style>
