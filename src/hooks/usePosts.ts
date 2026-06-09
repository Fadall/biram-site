import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity.client'
import { allPostsQuery } from '../lib/queries'
import { Post, PostListItem } from '../lib/types'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanityClient
      .fetch<Post[]>(allPostsQuery)
      .then((data) => {
        setPosts(data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Erreur Sanity:', err)
        setLoading(false)
      })
  }, [])

  const getLatestPost = () => {
    if (posts.length === 0) return { post: null, next: null, prev: null }

    const today = new Date()
    const todayString = today.toISOString().split('T')[0]

    const todayPost = posts.find((p) => p.publishDate === todayString)

    let currentPost = todayPost
    if (!currentPost) {
      const sorted = [...posts]
        .filter((p) => p.publishDate <= todayString)
        .sort(
          (a, b) =>
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        )
      currentPost = sorted[0]
    }

    if (!currentPost) return { post: null, next: null, prev: null }

    const sortedAll = [...posts].sort(
      (a, b) =>
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
    )
    const index = sortedAll.findIndex((p) => p._id === currentPost._id)

    return {
      post: currentPost,
      next: sortedAll[index + 1]?._id || null,
      prev: sortedAll[index - 1]?._id || null,
    }
  }

  const getPostById = (id: string) => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
    )

    const sortedIndex = sortedPosts.findIndex((p) => p._id === id)

    if (sortedIndex === -1) return { post: null, next: null, prev: null }

    return {
      post: sortedPosts[sortedIndex],
      next: sortedPosts[sortedIndex + 1]?._id || null,
      prev: sortedPosts[sortedIndex - 1]?._id || null,
    }
  }

  const getAllPostsForCalendar = (): PostListItem[] => {
    return posts.map((p) => ({
      _id: p._id,
      publishDate: p.publishDate,
      type: p.type,
      title: p.title,
    }))
  }

  return { getLatestPost, getPostById, getAllPostsForCalendar, loading }
}