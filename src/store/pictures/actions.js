/*
export function someAction (context) {
}
*/

import { S3Client } from '../../api/s3'

export function getPictures ({ commit }, folder) {
  S3Client.listPictures(folder)
    .then(pictures => {
      commit('setPictures', pictures)
    })
}
