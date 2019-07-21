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
        q-btn(round, dense, flat, color="grey-8", icon="add_a_photo", @click="uploadDialogOpen = true")
          q-tooltip 写真をアップロード
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
        q-item(v-for="link in folders", :key="link.text", v-ripple, clickable, @click="clickLink(link)")
          q-item-section(avatar)
            q-icon(color="grey", name="folder")
          q-item-section
            q-item-label {{ link.text }}

  q-dialog(v-model="uploadDialogOpen", full-width, full-height)
    q-card
      q-card-section.row.items-center
        .text-h6 写真アップロード
        q-space
        q-btn(icon="close", flat, round, dense, v-close-popup)
      q-card-section
        q-input(filled, v-model="folder", mask="date", :rules="['date']", label="アップロード日")
          template(v-slot:append)
            q-icon(name="event", class="cursor-pointer")
              q-popup-proxy(ref="qDateProxy", transition-show="scale", transition-hide="scake")
                q-date(v-model="folder", @input="() => $refs.qDateProxy.hide()"  )
      q-card-section
        .q-pa-sm
          q-uploader.my-uploader(
                    label="写真を選択",
                    multiple,
                    :hide-upload-btn="true",
                    @added="fileAdded",
                    @removed="fileRemoved")
      q-card-actions(align="center")
        q-btn(color="primary", label="アップロード", @click="upload", :loading="uploading")

  q-page-container
    router-view

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { S3Client } from '../api/s3'
import dateformat from 'dateformat'

const {
  mapMutations: mapMutationsOfFolders,
  mapActions: mapActionsOfFolders
} = createNamespacedHelpers('folders')

const {
  mapActions: mapActionsOfPictures
} = createNamespacedHelpers('pictures')

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      uploadDialogOpen: false,
      search: '',
      folder: '2019/07/22',
      selectedFiles: [],
      uploading: false,
      links1: [
        { icon: 'home', text: 'Homehoge' },
        { icon: 'whatshot', text: 'Trending' },
        { icon: 'subscriptions', text: 'Subscriptions' }
      ]
    }
  },
  computed: {
    folders: {
      get () {
        return this.$store.state.folders.all
      }
    },
    foldersForUploader: {
      get () {
        return this.folders.map(f => f.text)
      }
    }
  },
  methods: {
    ...mapMutationsOfFolders([
      'setCurrent'
    ]),
    ...mapActionsOfFolders(['getFolders']),
    ...mapActionsOfPictures(['getPictures']),
    clickLink (link) {
      this.leftDrawerOpen = false
      this.setCurrent(link)
      this.getPictures(link.value)
    },
    fileAdded (files) {
      this.selectedFiles = [...this.selectedFiles, ...files]
    },
    fileRemoved (files) {
      this.selectedFiles = this.selectedFiles.filter(file => !files.includes(file))
    },
    upload () {
      this.uploading = true
      const _folder = this.folder.replace(/\//g, '')
      S3Client.uploadPictures(_folder, this.selectedFiles)
        .then(res => {
          this.uploadding = false
          this.uploadDialogOpen = false
          this.getFolders()

          this.setCurrent({ text: this.folder, value: _folder })
          this.getPictures(_folder)
        })
    }
  },
  mounted () {
    this.getFolders()

    const now = new Date()
    this.folder = dateformat(now, 'yyyy/mm/dd')
  }
}
</script>

<style lang="stylus">
sp()
  @media screen and (max-width $breakpoint-xs-max)
    {block}

pc()
  @media screen and (min-width $breakpoint-xs-max)
    {block}

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

.upload-dialog
  background-color #ffffff

.my-uploader
  width 100%
  min-height 55vh
</style>
