<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-white.text-grey-8.q-py-xs(elevated)
    q-toolbar
      q-btn(flat, dense, round, @click="leftDrawerOpen = !leftDrawerOpen", aria-label="Menu", icon="menu")
      q-btn.q-ml-xs(flat, no-caps, no-wrap, v-if="$q.screen.gt.xs")
        q-icon(name="fab fa-youtube", color="red", size="28px")
        q-toolbar-title.text-weight-bold(shrink)
          | Jig.jp インターンアルバム
      q-space
      .YL__toolbar-input-container.row.no-wrap
        q-input.bg-white.col(dense, outlined, square, v-model="search", placeholder="Search")
        q-btn.YL__toolbar-input-btn(color="grey-3", text-color="grey-8", icon="search", unelevated)
      q-space
      .q-gutter-sm.row.items-center.no-wrap
        q-btn(round, dense, flat, color="grey-8", icon="video_call", v-if="$q.screen.gt.sm")
          q-tooltip Create a video or post
        q-btn(round, dense, flat, color="grey-8", icon="apps", v-if="$q.screen.gt.sm")
          q-tooltip Apps
        q-btn(round, dense, flat, color="grey-8", icon="message", v-if="$q.screen.gt.sm")
          q-tooltip Messages
        q-btn(round, dense, flat, color="grey-8", icon="notifications")
          q-badge(color="red", text-color="white", floating)
            | 2
          q-tooltip Notifications
        q-btn(round="", flat="")
          q-avatar(size="26px")
            img(src="https://cdn.quasar.dev/img/boy-avatar.png")
          q-tooltip Account

  q-drawer(v-model="leftDrawerOpen", bordered, show-if-above, content-class="bg-grey-2", :width="240")
    q-scroll-area.fit
      q-list(padding)
        q-item(v-for="link in links1", :key="link.text", v-ripple, clickable)
          q-item-section(avatar)
            q-icon(color="grey", :name="link.icon")
          q-item-section
            q-item-label {{ link.text }}
        q-separator.q-my-md
        q-item(v-for="link in dates", :key="link.text", v-ripple, clickable, @click="clickLink(link)")
          q-item-section(avatar)
            q-icon(color="grey", name="folder")
          q-item-section
            q-item-label {{ link.text }}
  q-page-container
    router-view
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapMutations: mapMutationsOfDates
} = createNamespacedHelpers('dates')

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      links1: [
        { icon: 'home', text: 'Homehoge' },
        { icon: 'whatshot', text: 'Trending' },
        { icon: 'subscriptions', text: 'Subscriptions' }
      ]
    }
  },
  computed: {
    dates: {
      get () {
        return this.$store.state.dates.all
      }
    }
  },
  methods: {
    ...mapMutationsOfDates([
      'setCurrent'
    ]),
    clickLink (link) {
      console.log(link)
      this.leftDrawerOpen = false
      this.setCurrent(link)
    }
  }
}
</script>

<style lang="stylus">
.YL
  &__toolbar-input-container
    min-width 100px
    width 55%
  &__toolbar-input-btn
    border-radius 0
    border-style solid
    border-width 1px 1px 1px 0
    border-color rgba(0,0,0,.24)
    max-width 60px
    width 100%
  &__drawer-footer-link
    color inherit
    text-decoration none
    font-weight 500
    font-size .75rem
    &:hover
      color #000
</style>
