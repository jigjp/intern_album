/*
export function someAction (context) {
}
*/

import axios from 'axios'

export function getPictures ({ commit }, folder) {
  axios.get(`/api/pictures?folder=${folder}`, { withCredentials: true })
    .then(res => {
      commit('setPictures', res.data.data)
    })
}
