<template lang="pug">
q-dialog(v-model="dialogOpen")
  q-card
    q-img.image(:src="picture.url", :ratio="1")

    q-card-section.my-card-section
      div メッセージとかいる？？？

    q-card-section.my-card-section
      q-chip(v-for="[emoji, count] in emojisWithCount", dense, size="10px", clickable, @click="addEmoji(emoji)")
        emoji(:emoji="emoji", :size="16")
        | x {{ count }}

    q-card-actions(align="around")
      q-icon(flat, color="red", name="far fa-grin-alt", @click="emoji_picker = !emoji_picker")
      q-btn(flat, color="teal", icon="bookmark")

    picker(v-show="emoji_picker", :pickerStyles="{width: '300px'}", @select="addEmoji")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Picker, Emoji } from 'emoji-mart-vue'

const {
  mapState: mapStateOfImageCardDialog,
  mapMutations: mapMutationsOfImageCardDialog
} = createNamespacedHelpers('imageCardDialog')

export default {
  // name: 'ComponentName',
  data () {
    return {
      emoji_picker: false,
      emojis: []
    }
  },
  components: {
    Picker,
    Emoji
  },
  computed: {
    ...mapStateOfImageCardDialog(['picture']),
    dialogOpen: {
      get () {
        return this.$store.state.imageCardDialog.dialogOpen
      },
      set (value) {
        this.setDialogOpen(value)
      }
    },
    emojisWithCount: {
      get () {
        return this.emojis.reduce((acc, value) => {
          const count = acc.get(value) | 0
          acc.set(value, count + 1)
          return acc
        }, new Map())
      }
    }
  },
  methods: {
    ...mapMutationsOfImageCardDialog(['setDialogOpen']),
    addEmoji (emoji) {
      this.emojis.push(emoji)
    }

  }
}
</script>

<style lang="stylus">
.image
  width 300px

.my-card-section
  width 300px
</style>
