type TranslationKeys =
  | 'billet_du'
  | 'avant_propos'
  | 'pensee_du_samedi'
  | 'du'
  | 'la_reflexion_qui_nous_reunira'
  | 'insha_allah'
  | 'a_demain_in_sha_a_allah'
  | 'as_salamu_aleykum'
  | 'publication_non_trouvee'
  | 'chargement'
  | 'allez_droit_a_vos_billets'
  | 'janvier' | 'fevrier' | 'mars' | 'avril' | 'mai' | 'juin'
  | 'juillet' | 'aout' | 'septembre' | 'octobre' | 'novembre' | 'decembre'
  | 'lun' | 'mar' | 'mer' | 'jeu' | 'ven' | 'sam' | 'dim'
  | 'touchez_pour_fermer'

type Translations = {
  fr: Record<TranslationKeys, string>
  en: Record<TranslationKeys, string>
}

export const translations: Translations = {
  fr: {
    billet_du: 'Billet du',
    avant_propos: 'Avant-propos',
    pensee_du_samedi: 'La pensée du samedi',
    du: 'du',
    la_reflexion_qui_nous_reunira: 'La réflexion qui nous réunira demain le',
    insha_allah: 'Insha\'Allah',
    a_demain_in_sha_a_allah: 'À demain in sha\'a Allah',
    as_salamu_aleykum: 'As-Salamu Aleykum',
    publication_non_trouvee: 'Publication non trouvée',
    chargement: 'Chargement...',
    allez_droit_a_vos_billets: 'Allez droit à vos billets',
    touchez_pour_fermer: 'Touchez pour fermer',

    janvier: 'janvier', fevrier: 'février', mars: 'mars', avril: 'avril',
    mai: 'mai', juin: 'juin', juillet: 'juillet', aout: 'août',
    septembre: 'septembre', octobre: 'octobre', novembre: 'novembre', decembre: 'décembre',

    lun: 'Lun', mar: 'Mar', mer: 'Mer', jeu: 'Jeu', ven: 'Ven', sam: 'Sam', dim: 'Dim',
  },
  en: {
    billet_du: 'Post of',
    avant_propos: 'Foreword',
    pensee_du_samedi: 'Saturday\'s Thought',
    du: 'of',
    la_reflexion_qui_nous_reunira: 'The reflection that will bring us together tomorrow on',
    insha_allah: 'Insha\'Allah',
    a_demain_in_sha_a_allah: 'See you tomorrow, in sha\'a Allah',
    as_salamu_aleykum: 'As-Salamu Aleykum',
    publication_non_trouvee: 'Publication not found',
    chargement: 'Loading...',
    allez_droit_a_vos_billets: 'Go straight to your posts',
    touchez_pour_fermer: 'Tap to close',

    janvier: 'January', fevrier: 'February', mars: 'March', avril: 'April',
    mai: 'May', juin: 'June', juillet: 'July', aout: 'August',
    septembre: 'September', octobre: 'October', novembre: 'November', decembre: 'December',

    lun: 'Mon', mar: 'Tue', mer: 'Wed', jeu: 'Thu', ven: 'Fri', sam: 'Sat', dim: 'Sun',
  },
}

export function t(key: TranslationKeys, lang: 'fr' | 'en'): string {
  return translations[lang][key] || key
}

// Formate une date selon la langue
export function formatDateByLang(dateString: string, lang: 'fr' | 'en'): string {
  const date = new Date(dateString + 'T00:00:00')
  if (lang === 'en') {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}