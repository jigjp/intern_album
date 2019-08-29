<template lang="pug">
.q-pa-lg
  q-infinite-scroll.scroll(@load="onLoad", :offset="250")
    .flex
      .item(class="item" v-for="(pic, index) in viewPictures", :key="index", @click="onClick(pic)")
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
  data () {
    return {
      viewPictures: []
    }
  },
  props: ['pictures'],
  methods: {
    ...mapMutationsOfImageCardDialog(['setPicture', 'setDialogOpen']),
    onClick (pic) {
      this.setPicture(pic)
      this.setDialogOpen(true)
    },
    onLoad (index, done) {
      const length = this.pictures.length
      if (length > index * 10) {
        this.viewPictures = [...this.viewPictures, ...this.pictures.slice(index * 10, index * 10 + 10)]
        done()
      }
    }
  },
  mounted () {
    this.viewPictures = this.pictures.slice(0, 10)
  }
}
</script>

<style lang="stylus" scoped>
.scroll
  height 80vh

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

.item
  cursor pointer

.picture
  +sp()
    width 40vw

  +pc()
    width 320px
</style>
