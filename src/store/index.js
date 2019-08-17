import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import folders from './folders'
import pictures from './pictures'
import imageCardDialog from './image-card-dialog'
import createPersistedState from 'vuex-persistedstate'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      auth,
      folders,
      pictures,
      imageCardDialog
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,

    // plugins
    plugins: [createPersistedState]
  })

  return Store
}
