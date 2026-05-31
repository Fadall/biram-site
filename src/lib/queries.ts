export const POST_FIELDS = `
  _id,
  title,
  subtitle,
  "slug": slug.current,
  publishDate,
  type,
  body,
  closingLine,
  coverImage,
  coverImageAlt,
  authorSignature,
  "relatedPost": relatedPost->{
    publishDate,
    "slug": slug.current
  }
`;

export const LATEST_POST_QUERY = `*[_type == "post" && status == "published"] | order(publishDate desc)[0] {
  ${POST_FIELDS}
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  ${POST_FIELDS},
  "next": *[_type == "post" && status == "published" && publishDate > ^.publishDate] | order(publishDate asc)[0] {
    "slug": slug.current,
    type
  },
  "prev": *[_type == "post" && status == "published" && publishDate < ^.publishDate] | order(publishDate desc)[0] {
    "slug": slug.current,
    type
  }
}`;

export const ALL_POSTS_FOR_CALENDAR_QUERY = `*[_type == "post" && status == "published"] | order(publishDate desc) {
  _id,
  "slug": slug.current,
  publishDate,
  type,
  title
}`;
