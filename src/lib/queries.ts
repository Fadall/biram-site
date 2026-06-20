export const allPostsQuery = `
  *[_type == "post"]
  | order(publishDate desc) {
    _id,
    title,
    subtitle,
    publishDate,
    type,
    body,
    closingLine,
    customClosing,
    "coverImage": coverImage.asset->url,
    "coverImageEn": coverImageEn.asset->url
  }
`