<template lang="pug">
.q-pa-md
  q-card
    q-card-section
      div ログイン

    q-card-section
      q-input(label="ログインID", v-model="login_id")

    q-card-section
      q-input(label="パスワード", v-model="password")

    q-card-actions
      q-btn(flat, @click="onClickLogin()") ログインする

  div {{ message }}

</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState: mapSatateOfAuth,
  mapActions: mapActionsOfAuth
} = createNamespacedHelpers('auth')

export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      login_id: '',
      password: ''
    }
  },
  computed: {
    ...mapSatateOfAuth(['message'])
  },
  methods: {
    ...mapActionsOfAuth(['login']),
    onClickLogin () {
      const user = {
        login_id: this.login_id,
        password: this.password
      }
      this.login(user)
        .then(isLoggedin => {
          if (isLoggedin) {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<style lang="stylus">
</style>
