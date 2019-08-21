/*
export function someAction (context) {
}
*/
import { apiGetPictures } from '../../api/service'

export function getPictures ({ commit }, folder) {
  return apiGetPictures(folder).then(res => {
    commit('setPictures', res)
  })
}
