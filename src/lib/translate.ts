const CACHE_KEY = 'translate_cache_v1'

// ========================================
// CACHE PERSISTANT (localStorage)
// ========================================

function loadCache(): Map<string, string> {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return new Map()
    return new Map(JSON.parse(raw))
  } catch {
    return new Map()
  }
}

function saveCache(cache: Map<string, string>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(cache.entries())))
  } catch {}
}

const cache = loadCache()

// ========================================
// CONFIG MYMEMORY
// ========================================

// Mets ton vrai email ici (n'importe quel email valide)
// Ça permet de passer de 5000 à 50 000 caractères/jour
const EMAIL = 'fadal10m@gmail.com'

// ========================================
// TRADUCTION D'UN TEXTE
// ========================================

export async function translateText(
  text: string,
  from: 'fr' | 'en' = 'fr',
  to: 'fr' | 'en' = 'en'
): Promise<string> {
  if (!text || from === to) return text

  const cacheKey = `${from}-${to}-${text}`
  if (cache.has(cacheKey)) return cache.get(cacheKey)!

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${from}|${to}&de=${EMAIL}`

    const response = await fetch(url)
    const data = await response.json()

    const translated = data?.responseData?.translatedText || text

    // Détection si on a atteint la limite
    if (
      typeof translated === 'string' &&
      translated.toUpperCase().includes('MYMEMORY WARNING')
    ) {
      console.warn('Limite MyMemory atteinte, on garde le texte original')
      return text
    }

    cache.set(cacheKey, translated)
    saveCache(cache)
    return translated
  } catch (err) {
    console.error('Erreur de traduction:', err)
    return text
  }
}

// ========================================
// TRADUCTION D'UN TABLEAU PORTABLE TEXT
// ========================================

export async function translatePortableText(
  blocks: any[],
  from: 'fr' | 'en' = 'fr',
  to: 'fr' | 'en' = 'en'
): Promise<any[]> {
  if (!blocks || !Array.isArray(blocks)) return blocks

  return Promise.all(
    blocks.map(async (block) => {
      if (block._type !== 'block' || !block.children) return block

      const translatedChildren = await Promise.all(
        block.children.map(async (child: any) => {
          if (child._type !== 'span' || !child.text) return child
          const translatedText = await translateText(child.text, from, to)
          return { ...child, text: translatedText }
        })
      )

      return { ...block, children: translatedChildren }
    })
  )
}