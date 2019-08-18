import axios from 'axios'

export function getFolders ({ commit }) {
  axios.get('/api/folders', { withCredentials: true })
    .then(res => {
      console.log(res)
      const folders = res.data.data.map(val => {
        return {
          text: val,
          value: val
        }
      })
      commit('setFolders', folders)
    })
}
