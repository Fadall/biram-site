import { useState } from 'react';
import { PostListItem } from '../lib/types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { getTheme } from '../lib/theme';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../lib/translations';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostListItem[];
}

export function CalendarModal({ isOpen, onClose, posts }: CalendarModalProps) {
  const { isDark } = useTheme();
  const theme = getTheme(isDark);
  const { language } = useLanguage();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const navigate = useNavigate();

  const WEEKDAYS = [
    t('lun', language),
    t('mar', language),
    t('mer', language),
    t('jeu', language),
    t('ven', language),
    t('sam', language),
    t('dim', language),
  ];

  const MONTHS = [
    t('janvier', language),
    t('fevrier', language),
    t('mars', language),
    t('avril', language),
    t('mai', language),
    t('juin', language),
    t('juillet', language),
    t('aout', language),
    t('septembre', language),
    t('octobre', language),
    t('novembre', language),
    t('decembre', language),
  ];

  const typeColors: Record<string, string> = {
    billet: theme.billet,
    avant_propos: theme.avantPropos,
    pensee: theme.pensee,
  };

  const typeLabels: Record<string, string> = {
    billet: language === 'en' ? 'Post' : 'Billet',
    avant_propos: language === 'en' ? 'Teaser' : 'Aguiche',
    pensee: language === 'en' ? 'Thought' : 'Pensée',
  };

  if (!isOpen) return null;

  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const postMap: Record<number, PostListItem> = {};
  posts.forEach(p => {
    const date = new Date(p.publishDate + 'T00:00:00');
    if (date.getFullYear() === year && date.getMonth() === month) {
      postMap[date.getDate()] = p;
    }
  });

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  }

  function handleDayClick(day: number) {
    const post = postMap[day];
    if (!post) return;
    navigate(`/posts/${post._id}`);
    onClose();
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 99998,
        }}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: theme.bg,
          borderRadius: '24px 24px 0 0',
          zIndex: 99999,
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
          <div style={{ width: '40px', height: '4px', background: theme.borderLight, borderRadius: '2px' }} />
        </div>

        <div style={{ padding: '16px 24px 32px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: theme.text }}>
              {t('allez_droit_a_vos_billets', language)}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: theme.border,
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '16px',
                color: theme.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button
              onClick={prevMonth}
              style={{
                background: 'transparent',
                border: `1px solid ${theme.border}`,
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                fontSize: '14px',
                color: theme.text,
              }}
            >
              ◀
            </button>
            <span style={{ fontSize: '16px', fontWeight: 500, textTransform: 'capitalize', color: theme.text }}>
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              style={{
                background: 'transparent',
                border: `1px solid ${theme.border}`,
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                fontSize: '14px',
                color: theme.text,
              }}
            >
              ▶
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '8px' }}>
            {WEEKDAYS.map((d, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  fontSize: '11px',
                  color: theme.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '4px 0',
                }}
              >
                {d}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const post = postMap[day];

              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 0',
                    borderRadius: '12px',
                    cursor: post ? 'pointer' : 'default',
                    background: post ? theme.bgSecondary : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: post ? 600 : 400,
                      color: post ? theme.text : theme.textVeryLight,
                    }}
                  >
                    {day}
                  </span>
                  {post && (
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        marginTop: '3px',
                        background: typeColors[post.type] || theme.textMuted,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: `1px solid ${theme.border}`,
            }}
          >
            {Object.entries(typeLabels).map(([key, label]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: typeColors[key],
                  }}
                />
                <span style={{ fontSize: '11px', color: theme.textMuted }}>{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}