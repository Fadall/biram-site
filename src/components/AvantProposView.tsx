import { Post } from '../lib/types';
import { getAnnouncedDate } from '../lib/utils';
import { PortableTextContent } from './PortableTextContent';

export function AvantProposView({ post }: { post: Post }) {
  const announcedDate = getAnnouncedDate(
  post.publishDate,
);

  return (
    <article style={{
      minHeight: '100vh',
      background: 'linear-gradient(170deg, #F7F2EA 0%, #EDE6D8 40%, #F0EBE1 100%)',
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

        {/* ORNEMENT HAUT */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px',
        }}>
          <div style={{ width: '32px', height: '1px', background: '#C4B08A' }} />
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            border: '1px solid #C4B08A',
          }} />
          <div style={{ width: '32px', height: '1px', background: '#C4B08A' }} />
        </div>

        {/* BADGE */}
        <p style={{
          color: '#B8860B',
          letterSpacing: '0.28em',
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          marginBottom: '40px',
          fontFamily: 'Inter, sans-serif',
        }}>
          Avant-propos
        </p>

        {/* PHRASE D'ACCROCHE */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '22px',
          fontWeight: 600,
          color: '#2A2218',
          lineHeight: 1.5,
          letterSpacing: '-0.01em',
          marginBottom: '12px',
          padding: '0 8px',
        }}>
          La réflexion qui nous réunira demain le {announcedDate}
        </h1>

        {/* SÉPARATEUR */}
        <div style={{
          width: '64px',
          height: '1px',
          background: '#D4C4A4',
          margin: '0 auto 48px',
        }} />

        {/* CORPS */}
        <div style={{
          fontFamily: 'Lora, serif',
          fontSize: '17px',
          color: '#3A2F22',
          lineHeight: 2,
          maxWidth: '420px',
          margin: '0 auto',
        }}>
          <PortableTextContent value={post.body} />
        </div>

        {/* CLÔTURE */}
        <div style={{ marginTop: '56px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}>
            <div style={{ width: '32px', height: '1px', background: '#D4C4A4' }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: '1px solid #D4C4A4',
            }} />
            <div style={{ width: '32px', height: '1px', background: '#D4C4A4' }} />
          </div>
          <p style={{
            fontFamily: 'Lora, serif',
            fontStyle: 'italic',
            color: '#8A7A5A',
            fontSize: '15px',
            marginBottom: '12px',
          }}>
            {post.customClosing || 'À demain in sha\'a Allah'}
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: '#A09070',
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