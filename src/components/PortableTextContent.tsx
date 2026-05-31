import { PortableText } from '@portabletext/react';

const components = {
  block: {
    normal: ({ children }: any) => (
      <p style={{
        marginBottom: '20px',
        lineHeight: 'inherit',
        whiteSpace: 'pre-wrap',
        margin: '0 0 20px 0',
      }}>
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '24px',
        marginBottom: '24px',
        marginTop: '32px',
      }}>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '20px',
        marginBottom: '20px',
        marginTop: '28px',
      }}>
        {children}
      </h2>
    ),
  },
};

export function PortableTextContent({ value }: { value: any }) {
  if (typeof value === 'string') {
    return (
      <p style={{
        marginBottom: '20px',
        lineHeight: 'inherit',
        whiteSpace: 'pre-wrap',
      }}>
        {value}
      </p>
    );
  }
  return <PortableText value={value} components={components} />;
}