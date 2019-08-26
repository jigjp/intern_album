/*
export function someAction (context) {
}
*/
import { apiGetPictures } from '../../api/service'

export function getPictures ({ commit }, folder) {
  return apiGetPictures(folder).then(res => {
    const pictures = res.map(({ url }) => {
      url = url.startsWith('https') ? url : `${process.env.API}${url}`
      const thumbnailUrl = url.replace(/media/, 'resize')
      return { url, thumbnailUrl }
    })
    commit('setPictures', pictures)
  })
}
