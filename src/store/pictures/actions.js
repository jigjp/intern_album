/*
export function someAction (context) {
}
*/
import { apiGetPictures } from '../../api/service'

export function getPictures ({ commit }, folder) {
  return apiGetPictures(folder).then(res => {
    const pictures = res.map(({ url }) => {
      url = `${process.env.API}${url}`
      return { url }
    })
    commit('setPictures', pictures)
  })
}
