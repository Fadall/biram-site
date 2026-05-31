import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TopNavigationProps {
  prevSlug?: string;
  nextSlug?: string;
}

export function TopNavigation({ prevSlug, nextSlug }: TopNavigationProps) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 80) {
        setVisible(true);
      } else if (currentScroll > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const buttonStyle = (enabled: boolean): React.CSSProperties => ({
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    cursor: enabled ? 'pointer' : 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: enabled ? '#1A1A1A' : '#CFCFCF',
    transition: 'transform 0.15s ease',
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px',
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <button
        onClick={() => prevSlug && navigate(`/posts/${prevSlug}`)}
        disabled={!prevSlug}
        style={buttonStyle(!!prevSlug)}
      >
        ←
      </button>

      <button
        onClick={() => nextSlug && navigate(`/posts/${nextSlug}`)}
        disabled={!nextSlug}
        style={buttonStyle(!!nextSlug)}
      >
        →
      </button>
    </div>
  );
}