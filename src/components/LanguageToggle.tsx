import { useLanguage } from '../contexts/LanguageContext'

export function LanguageToggle({ translating }: { translating?: boolean }) {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      disabled={translating}
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        borderRadius: '999px',
        padding: '6px 14px',
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.15em',
        color: '#1A1A1A',
        cursor: translating ? 'wait' : 'pointer',
        fontWeight: 500,
        opacity: translating ? 0.6 : 1,
      }}
    >
      {translating ? '...' : language === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}