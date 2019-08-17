/*
export function someAction (context) {
}
*/
import axios from 'axios'

const SUCCESS = 200

export function login ({ commit }, user) {
  localStorage.removeItem('user')
  return axios.post('http://localhost:4000/api/sessions', { user }, { withCredentials: true })
    .then(res => {
      if (res.status !== SUCCESS || res.data.errors) {
        commit('setMessage', res.data.errors.detail)
        return false
      }

      localStorage.setItem('user', JSON.stringify(res.data))
      return true
    })
}
