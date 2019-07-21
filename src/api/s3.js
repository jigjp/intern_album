import AWS from 'aws-sdk'
AWS.config.region = 'ap-northeast-1' // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-1:090f9552-3e8b-4110-b580-6c90f973e437'
})

const BUCKET_NAME = 'intern-album'
const s3 = new AWS.S3({ params: { Bucket: BUCKET_NAME } })
export const S3Client = {
  listFolder () {
    return new Promise((resolve, reject) => {
      s3.listObjects({ Delimiter: '/' }, function (err, data) {
        if (err) {
          reject(err)
        }

        const prefixes = data.CommonPrefixes.map(p => {
          const prefix = p.Prefix

          // 末尾の / を削除
          return prefix.replace(/\/$/, '')
        })

        resolve(prefixes)
      })
    })
  },

  listPictures (folder) {
    return new Promise((resolve, reject) => {
      s3.listObjects({ Prefix: folder }, function (err, data) {
        if (err) {
          reject(err)
        }

        const href = this.request.httpRequest.endpoint.href
        const bucketUrl = href + BUCKET_NAME + '/'

        const photos = data.Contents
          .filter(content => !content.Key.endsWith('/'))
          .map(photo => {
            const photoKey = photo.Key
            const url = bucketUrl + encodeURIComponent(photoKey)

            return { url }
          })

        return resolve(photos)
      })
    })
  },

  uploadPictures (folder, files) {
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const photoKey = encodeURIComponent(folder) + '/' + file.name

        const param = {
          Key: photoKey,
          Body: file,
          ACL: 'public-read'
        }
        s3.upload(param, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
      })
    })

    return Promise.all(promises)
  }
}
