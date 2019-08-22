import { apiLogin } from '../../api/service.js'

export function login ({ commit }, user) {
  return apiLogin(user)
    .then(res => {
      if (!res) {
        commit('setMessage', 'ログインに失敗しました')
        return false
      }

      return true
    })
}
