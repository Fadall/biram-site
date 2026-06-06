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
    if (posts.length === 0) return null
    return [...posts].sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )[0]
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