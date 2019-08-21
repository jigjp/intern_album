import { apiGetFolders } from '../../api/service.js'

export function getFolders ({ commit }) {
  return apiGetFolders().then(res => {
    commit('setFolders', res)
  })
}
