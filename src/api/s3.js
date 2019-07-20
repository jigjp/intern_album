import AWS from 'aws-sdk'
AWS.config.region = 'ap-northeast-1' // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-1:090f9552-3e8b-4110-b580-6c90f973e437'
})

const s3 = new AWS.S3({ params: { Bucket: 'intern-album' } })
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
  }
}
