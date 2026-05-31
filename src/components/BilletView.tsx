import { Post } from '../lib/types';
import { formatDate } from '../lib/utils';
import { PortableTextContent } from './PortableTextContent';
import { motion, useScroll, useTransform } from 'framer-motion';

export function BilletView({ post }: { post: Post }) {
  const { scrollY } = useScroll();
  const imageHeight = useTransform(scrollY, [-200, 0], ['calc(44svh + 200px)', '44svh']);
  const imageScale = useTransform(scrollY, [-200, 0], [1.15, 1]);
  return (
    <article style={{ minHeight: '100vh', background: '#FAFAF7', paddingBottom: '120px' }}>

      {/* IMAGE */}
      {post.coverImage && (
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: imageHeight,
          minHeight: '260px',
          maxHeight: '600px',
          overflow: 'hidden',
        }}
      >
        <motion.img
          src={post.coverImage}
          alt={post.coverImageAlt || post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            scale: imageScale,
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(250,250,247,0.4) 70%, #FAFAF7 100%)',
        }} />
      </motion.div>
    )}

      {/* CONTENU */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        marginTop: post.coverImage ? '-60px' : '40px',
        padding: '0 24px',
      }}>
        <div style={{
          background: '#FAFAF7',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          paddingTop: '40px',
          paddingLeft: '8px',
          paddingRight: '8px',
        }}>

          {/* HEADER */}
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{
              color: '#2C4A7C',
              letterSpacing: '0.22em',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'Inter, sans-serif',
            }}>
              Billet du {formatDate(post.publishDate)}
            </p>

            {post.title && (
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#1A1A1A',
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
              background: '#2C4A7C',
              margin: '32px auto 0',
              borderRadius: '999px',
            }} />
          </header>

          {/* CORPS */}
          <div style={{
            fontFamily: 'Lora, serif',
            fontSize: '17px',
            color: '#3A3A3A',
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
                background: '#E8E5DF',
                margin: '0 auto 24px',
              }} />
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                color: '#2C4A7C',
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
              background: '#D8D5CF',
              margin: '0 auto 20px',
            }} />
            <p style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              color: '#8A8A8A',
              fontSize: '15px',
              marginBottom: '4px',
            }}>
              As-Salamu Aleykum
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: '#A0A0A0',
              fontSize: '13px',
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}>
              @birampathefall
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: '#BFBFBF',
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