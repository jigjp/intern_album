<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-white.text-grey-8.q-py-xs(elevated)
    q-toolbar
      q-btn(flat, dense, round, @click="leftDrawerOpen = !leftDrawerOpen", aria-label="Menu", icon="menu")
      q-btn.q-ml-xs(flat, no-caps, no-wrap, v-if="$q.screen.gt.xs")
        q-icon(name="fab fa-youtube", color="red", size="28px")
        q-toolbar-title.text-weight-bold(shrink)
          | YouTub
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
        q-item(v-for="link in links2", :key="link.text", v-ripple, clickable)
          q-item-section(avatar)
            q-icon(color="grey", :name="link.icon")
          q-item-section
            q-item-label {{ link.text }}
        q-separator.q-mt-md.q-mb-xs
        q-item-label.text-weight-bold.text-uppercase(header)
          | More from Youtube
        q-item(v-for="link in links3", :key="link.text", v-ripple, clickable)
          q-item-section(avatar)
            q-icon(color="grey", :name="link.icon")
          q-item-section
            q-item-label {{ link.text }}
        q-separator.q-my-md
        q-item(v-for="link in links4", :key="link.text", v-ripple, clickable)
          q-item-section(avatar)
            q-icon(color="grey", :name="link.icon")
          q-item-section
            q-item-label {{ link.text }}
        q-separator.q-mt-md.q-mb-lg
        .q-px-md.text-grey-9
          .row.items-center.q-gutter-x-sm.q-gutter-y-xs
            a.YL__drawer-footer-link(v-for="button in buttons1", :key="button.text", href="javascript:void(0)")
              | {{ button.text }}
        .q-py-md.q-px-md.text-grey-9
          .row.items-center.q-gutter-x-sm.q-gutter-y-xs
            a.YL__drawer-footer-link(v-for="button in buttons2", :key="button.text", href="javascript:void(0)")
              | {{ button.text }}
  q-page-container
    router-view
</template>

<script>
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
      ],
      links2: [
        { icon: 'folder', text: 'Library' },
        { icon: 'restore', text: 'History' },
        { icon: 'watch_later', text: 'Watch later' },
        { icon: 'thumb_up_alt', text: 'Liked videos' }
      ],
      links3: [
        { icon: 'fab fa-youtube', text: 'YouTube Premium' },
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming' },
        { icon: 'live_tv', text: 'Live' }
      ],
      links4: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'flag', text: 'Report history' },
        { icon: 'help', text: 'Help' },
        { icon: 'feedback', text: 'Send feedback' }
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' }
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' }
      ]
    }
  },
  mounted () {
    this.links2 = [{ icon: 'folder', text: 'hogehoge' }]
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
