<template lang="pug">
.container
  .title.text-weight-bold.q-ma-md
    | 2019/7/24
  .q-pa-md.row.items-start
    q-card.my-card(v-for="pic in pictures")
      q-img(:src="pic.url", transition="rotate")
      //- q-card-actions(align="around")
      //-   q-btn(flat, rround, color="red", icon="favorite")
      //-   q-btn(flat, rround, color="teal", icon="bookmark")
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
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
  +sp()
    width calc(50% - 16px)

  +pc()
    width 300px
    margin 48px
</style>
