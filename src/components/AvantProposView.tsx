import { Post } from '../lib/types';
import { PortableTextContent } from './PortableTextContent';
import { useState } from 'react';
import { ImageViewer } from './ImageViewer';
import { useLanguage } from '../contexts/LanguageContext';
import { t, formatDateByLang } from '../lib/translations';
import { useTheme } from '../hooks/useTheme';
import { getTheme } from '../lib/theme';

export function AvantProposView({ post }: { post: Post }) {
  const [showImage, setShowImage] = useState(false);
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const theme = getTheme(isDark);
  const body = language === 'en' && post.bodyEn ? post.bodyEn : post.body;
  const customClosing = language === 'en' && post.customClosingEn ? post.customClosingEn : post.customClosing;

  const displayImage =
    language === 'en' && post.coverImageEn
      ? post.coverImageEn
      : post.coverImage;

  const announcedDate = formatDateByLang(
    new Date(new Date(post.publishDate).getTime() + 86400000).toISOString().split('T')[0],
    language
  );

  return (
    <article style={{
      minHeight: '100vh',
      background: theme.bgAvantPropos,
      paddingBottom: '120px',
    }}>

      {/* IMAGE (optionnelle) */}
      {displayImage && (
        <div
          onClick={() => setShowImage(true)}
          style={{
            position: 'relative',
            width: '100%',
            height: '38svh',
            minHeight: '240px',
            maxHeight: '380px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <img
            src={displayImage}
            alt={post.coverImageAlt || 'Avant-propos'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0) 70%, ${theme.bgAvantPropos.includes('linear') ? '#F0EBE1' : theme.bgAvantPropos} 100%)`,
            pointerEvents: 'none',
          }} />

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
          alt={post.coverImageAlt || 'Avant-propos'}
          onClose={() => setShowImage(false)}
        />
      )}

      {/* CONTENU */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: displayImage ? '40px 24px 0' : '60px 24px 0',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '480px',
          textAlign: 'center',
        }}>

          {/* ORNEMENT HAUT */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}>
            <div style={{ width: '32px', height: '1px', background: theme.ornament }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: `1px solid ${theme.ornament}`,
            }} />
            <div style={{ width: '32px', height: '1px', background: theme.ornament }} />
          </div>

          {/* BADGE */}
          <p style={{
            color: theme.avantPropos,
            letterSpacing: '0.28em',
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '40px',
            fontFamily: 'Inter, sans-serif',
          }}>
            {t('avant_propos', language)}
          </p>

          {/* PHRASE D'ACCROCHE */}
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '22px',
            fontWeight: 600,
            color: theme.text,
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            marginBottom: '48px',
            padding: '0 8px',
          }}>
            {t('la_reflexion_qui_nous_reunira', language)} {announcedDate}
          </h1>

          <div style={{
            width: '64px',
            height: '1px',
            background: theme.ornamentLight,
            margin: '0 auto 48px',
          }} />

          <div style={{
            fontFamily: 'Lora, serif',
            fontSize: '17px',
            color: theme.textSecondary,
            lineHeight: 2,
            maxWidth: '420px',
            margin: '0 auto',
          }}>
            <PortableTextContent value={body} />
          </div>

          <div style={{ marginTop: '56px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
            }}>
              <div style={{ width: '32px', height: '1px', background: theme.ornamentLight }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: `1px solid ${theme.ornamentLight}`,
              }} />
              <div style={{ width: '32px', height: '1px', background: theme.ornamentLight }} />
            </div>

            <p style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              color: theme.textMuted,
              fontSize: '15px',
              marginBottom: '12px',
            }}>
              {language === 'en'
                ? (post.customClosingEn || t('a_demain_in_sha_a_allah', language))
                : (customClosing || t('a_demain_in_sha_a_allah', language))}
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: theme.textLight,
              fontSize: '14px',
              letterSpacing: '0.2em',
              fontWeight: 500,
            }}>
              BPF
            </p>
          </div>

        </div>
      </div>
    </article>
  );
}