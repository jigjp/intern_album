import { S3Client } from '../../api/s3'

export function getFolders ({ commit }) {
  S3Client.listFolder()
    .then(res => {
      // { text: 'yyyy/MM/dd', value: yyyyMMdd }
      // の形にする
      const folders = res.map(value => {
        const text = `${value.substr(0, 4)}/${value.substr(4, 2)}/${value.substr(6, 2)}`
        return { text, value }
      })

      commit('setFolders', folders)
    })
}
