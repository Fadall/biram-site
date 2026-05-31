import { useState } from 'react';
import { mockPosts } from '../lib/mockData';
import { Post, PostListItem } from '../lib/types';

export function usePosts() {
  const [posts] = useState<Post[]>(mockPosts);

  const getLatestPost = () => {
    return [...posts].sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )[0];
  };

  const getPostBySlug = (slug: string) => {
    const postIndex = posts.findIndex(p => p.slug.current === slug);
    if (postIndex === -1) return { post: null, next: null, prev: null };

    const sortedPosts = [...posts].sort((a, b) => 
      new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
    );
    const sortedIndex = sortedPosts.findIndex(p => p.slug.current === slug);

    return {
      post: sortedPosts[sortedIndex],
      next: sortedPosts[sortedIndex + 1]?.slug.current,
      prev: sortedPosts[sortedIndex - 1]?.slug.current
    };
  };

  const getAllPostsForCalendar = (): PostListItem[] => {
    return posts.map(p => ({
      _id: p._id,
      slug: p.slug,
      publishDate: p.publishDate,
      type: p.type,
      title: p.title
    }));
  };

  return { getLatestPost, getPostBySlug, getAllPostsForCalendar };
}
