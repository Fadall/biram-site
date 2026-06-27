export type PostType = 'billet' | 'avant_propos' | 'pensee';

export interface Post {
  _id: string;
  title?: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  publishDate: string;
  type: PostType;
  body: any;
  bodyEn?: any;
  closingLine?: string;
  closingLineEn?: string;
  customClosing?: string;
  customClosingEn?: string;
  coverImage?: string;
  coverImageEn?: string;
  coverImageAlt?: string;
  authorSignature?: string;
}
export interface PostListItem {
  _id: string;
  publishDate: string;
  type: PostType;
  title?: string;
}