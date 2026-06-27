export const allPostsQuery = `
  *[_type == "post"]
  | order(publishDate desc) {
    _id,
    title,
    titleEn,
    subtitle,
    subtitleEn,
    publishDate,
    type,
    body,
    bodyEn,
    closingLine,
    closingLineEn,
    customClosing,
    customClosingEn,
    "coverImage": coverImage.asset->url,
    "coverImageEn": coverImageEn.asset->url
  }
`