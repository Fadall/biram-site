import { Post } from '../lib/types';
import { PortableTextContent } from './PortableTextContent';
import { useState } from 'react';
import { ImageViewer } from './ImageViewer';
import { useLanguage } from '../contexts/LanguageContext';
import { t, formatDateByLang } from '../lib/translations';
import { useTheme } from '../hooks/useTheme';
import { getTheme } from '../lib/theme'

export function PenseeView({ post }: { post: Post }) {
  const [showImage, setShowImage] = useState(false);
  const { language } = useLanguage()
  const { isDark } = useTheme()
  const theme = getTheme(isDark)
  return (
    <article style={{ minHeight: '100vh', background: theme.bg, paddingBottom: '120px' }}>

      {/* IMAGE */}
      {post.coverImage && (
  <div
    onClick={() => setShowImage(true)}
    style={{
      position: 'relative',
      width: '100%',
      height: '38svh',
      minHeight: '260px',
      maxHeight: '420px',
      overflow: 'hidden',
      cursor: 'pointer',
    }}
  >
    <img
      src={post.coverImage}
      alt={post.coverImageAlt || post.title}
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
    />
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, transparent 40%, rgba(250,250,247,0.4) 70%, theme.bg 100%)',
      pointerEvents: 'none',
    }} />

    {/* INDICATEUR DISCRET */}
    <div style={{
      position: 'absolute',
      top: '16px',
      right: '16px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '16px',
      pointerEvents: 'none',
    }}>
      ⛶
    </div>
  </div>
)}

{showImage && post.coverImage && (
  <ImageViewer
    src={post.coverImage}
    alt={post.coverImageAlt || post.title || ''}
    onClose={() => setShowImage(false)}
  />
)}

      {/* CONTENU */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        marginTop: post.coverImage ? '-60px' : '40px',
        padding: '0 24px',
      }}>
        <div style={{
          background: theme.bg,
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          paddingTop: '40px',
          paddingLeft: '8px',
          paddingRight: '8px',
        }}>

          {/* HEADER */}
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{
              color: '#6B4C8C',
              letterSpacing: '0.25em',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'Inter, sans-serif',
            }}>
              {t('pensee_du_samedi', language)}
            </p>

            {post.subtitle && (
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '26px',
                fontWeight: 700,
                fontStyle: 'italic',
                color: theme.text,
                lineHeight: 1.35,
                letterSpacing: '-0.01em',
                margin: 0,
                padding: '0 16px',
              }}>
                {post.subtitle}
              </h1>
            )}

            <p style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              color: '#9A9A9A',
              fontSize: '13px',
              marginTop: '16px',
            }}>
              {t('du', language)} {formatDateByLang(post.publishDate, language)}
            </p>

            <div style={{
              width: '40px',
              height: '2px',
              background: '#6B4C8C',
              margin: '32px auto 0',
              borderRadius: '999px',
              opacity: 0.6,
            }} />
          </header>

          {/* CORPS */}
          <div style={{
            fontFamily: 'Lora, serif',
            fontSize: '17px',
            color: theme.textSecondary,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 2,
            fontStyle: 'italic',
            padding: '0 8px',
          }}>
            <PortableTextContent value={post.body} />
          </div>

          {/* SIGNATURE */}
          <footer style={{ marginTop: '56px', textAlign: 'center' }}>
            <div style={{
              width: '24px',
              height: '1px',
              background: '#D8D5CF',
              margin: '0 auto 20px',
            }} />
            <p style={{
              fontFamily: 'Playfair Display, serif',
              color: '#6B4C8C',
              fontSize: '18px',
              letterSpacing: '-0.01em',
            }}>
              {post.authorSignature || '@birampathefall'}
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: '#BFBFBF',
              fontSize: '11px',
              marginTop: '8px',
              letterSpacing: '0.05em',
            }}>
              biram@biram.net
            </p>
          </footer>

        </div>
      </div>
    </article>
  );
}