import { Post } from '../lib/types';
import { PortableTextContent } from './PortableTextContent';
import { useLanguage } from '../contexts/LanguageContext';
import { t, formatDateByLang } from '../lib/translations';
import { useTheme } from '../hooks/useTheme';
import { getTheme } from '../lib/theme';

export function AvantProposView({ post }: { post: Post }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const theme = getTheme(isDark);

  const announcedDate = formatDateByLang(
    new Date(new Date(post.publishDate).getTime() + 86400000).toISOString().split('T')[0],
    language
  );

  return (
    <article style={{
      minHeight: '100vh',
      background: theme.bgAvantPropos,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px 120px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        textAlign: 'center',
      }}>

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
          <PortableTextContent value={post.body} />
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
            {post.customClosing || t('a_demain_in_sha_a_allah', language)}
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
    </article>
  );
}