export type PostType = 'billet' | 'avant_propos' | 'pensee';

export interface Post {
  _id: string;
  title?: string;
  subtitle?: string;
  slug: { current: string };
  publishDate: string;
  type: PostType;
  body: any; // PortableText
  closingLine?: string;
  coverImage?: any;
  coverImageAlt?: string;
  authorSignature?: string;
  relatedPost?: {
    publishDate: string;
    slug: { current: string };
  };
}

export interface PostListItem {
  _id: string;
  slug: { current: string };
  publishDate: string;
  type: PostType;
  title?: string;
}
