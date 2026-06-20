import { Post } from '../lib/types';
import { PortableTextContent } from './PortableTextContent';
import { useState } from 'react';
import { ImageViewer } from './ImageViewer';
import { useLanguage } from '../contexts/LanguageContext';
import { t, formatDateByLang } from '../lib/translations';
import { useTheme } from '../hooks/useTheme';
import { getTheme } from '../lib/theme';

export function BilletView({ post }: { post: Post }) {
  const [showImage, setShowImage] = useState(false);
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const theme = getTheme(isDark);

  // Image qui change selon la langue
  const displayImage =
    language === 'en' && post.coverImageEn
      ? post.coverImageEn
      : post.coverImage;

  return (
    <article style={{ minHeight: '100vh', background: theme.bg, paddingBottom: '120px' }}>

      {/* IMAGE */}
      {displayImage && (
        <div
          onClick={() => setShowImage(true)}
          style={{
            position: 'relative',
            width: '100%',
            height: '44svh',
            minHeight: '260px',
            maxHeight: '420px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <img
            src={displayImage}
            alt={post.coverImageAlt || post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0) 70%, ${theme.bg} 100%)`,
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

      {showImage && displayImage && (
        <ImageViewer
          src={displayImage}
          alt={post.coverImageAlt || post.title || ''}
          onClose={() => setShowImage(false)}
        />
      )}

      {/* CONTENU */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        marginTop: displayImage ? '-60px' : '40px',
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
              color: theme.billet,
              letterSpacing: '0.22em',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'Inter, sans-serif',
            }}>
              {t('billet_du', language)} {formatDateByLang(post.publishDate, language)}
            </p>

            {post.title && (
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '24px',
                fontWeight: 700,
                color: theme.text,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                margin: 0,
                padding: '0 16px',
              }}>
                {post.title}
              </h1>
            )}

            <div style={{
              width: '40px',
              height: '2px',
              background: theme.billet,
              margin: '32px auto 0',
              borderRadius: '999px',
            }} />
          </header>

          {/* CORPS */}
          <div style={{
            fontFamily: 'Lora, serif',
            fontSize: '17px',
            color: theme.textSecondary,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.9,
            padding: '0 8px',
          }}>
            <PortableTextContent value={post.body} />
          </div>

          {/* CLÔTURE */}
          {post.closingLine && (
            <div style={{ marginTop: '56px', textAlign: 'center' }}>
              <div style={{
                width: '32px',
                height: '1px',
                background: theme.border,
                margin: '0 auto 24px',
              }} />
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                color: theme.billet,
                fontSize: '20px',
                lineHeight: 1.4,
                padding: '0 24px',
                margin: 0,
              }}>
                {post.closingLine}
              </p>
            </div>
          )}

          {/* SIGNATURE */}
          <footer style={{ marginTop: '56px', textAlign: 'center' }}>
            <div style={{
              width: '24px',
              height: '1px',
              background: theme.borderLight,
              margin: '0 auto 20px',
            }} />
            <p style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              color: theme.textMuted,
              fontSize: '15px',
              marginBottom: '4px',
            }}>
              {t('as_salamu_aleykum', language)}
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: theme.textLight,
              fontSize: '13px',
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}>
              @birampathefall
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: theme.textVeryLight,
              fontSize: '11px',
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