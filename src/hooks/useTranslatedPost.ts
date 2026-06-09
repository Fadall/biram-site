import { useState, useEffect } from 'react'
import { translateText, translatePortableText } from '../lib/translate'
import { Post } from '../lib/types'
import { useLanguage } from '../contexts/LanguageContext'

export function useTranslatedPost(post: Post | null) {
  const { language } = useLanguage()
  const [translatedPost, setTranslatedPost] = useState<Post | null>(post)
  const [translating, setTranslating] = useState(false)

  useEffect(() => {
    if (!post) {
      setTranslatedPost(null)
      return
    }

    if (language === 'fr') {
      setTranslatedPost(post)
      return
    }

    setTranslating(true)

    Promise.all([
      post.title ? translateText(post.title, 'fr', 'en') : Promise.resolve(undefined),
      post.subtitle ? translateText(post.subtitle, 'fr', 'en') : Promise.resolve(undefined),
      post.closingLine ? translateText(post.closingLine, 'fr', 'en') : Promise.resolve(undefined),
      post.customClosing ? translateText(post.customClosing, 'fr', 'en') : Promise.resolve(undefined),
      post.body ? translatePortableText(post.body, 'fr', 'en') : Promise.resolve(undefined),
    ])
      .then(([title, subtitle, closingLine, customClosing, body]) => {
        setTranslatedPost({
          ...post,
          title: title || post.title,
          subtitle: subtitle || post.subtitle,
          closingLine: closingLine || post.closingLine,
          customClosing: customClosing || post.customClosing,
          body: body || post.body,
        })
        setTranslating(false)
      })
      .catch(() => {
        setTranslatedPost(post)
        setTranslating(false)
      })
  }, [post, language])

  return { post: translatedPost, translating }
}