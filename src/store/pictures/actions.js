/*
export function someAction (context) {
}
*/
import { apiGetPictures } from '../../api/service'

export function getPictures ({ commit }, folder) {
  commit('setPictures', [])
  return apiGetPictures(folder).then(res => {
    const pictures = res.map(({ url }) => {
      let thumbnailUrl
      if (url.startsWith('https')) {
        thumbnailUrl = url.replace(/https:\/\/[^/]*/, `${process.env.API}resize2`)
      } else {
        url = `${process.env.API}${url}`
        thumbnailUrl = url.replace(/media/, 'resize')
      }

      return { url, thumbnailUrl }
    })
    commit('setPictures', pictures)
  })
}
