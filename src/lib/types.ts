export type PostType = 'billet' | 'avant_propos' | 'pensee';

export interface Post {
  _id: string;
  title?: string;
  subtitle?: string;
  publishDate: string;
  type: PostType;
  body: any;
  closingLine?: string;
  customClosing?: string;
  coverImage?: string;
  coverImageAlt?: string;
  authorSignature?: string;
}

export interface PostListItem {
  _id: string;
  publishDate: string;
  type: PostType;
  title?: string;
}