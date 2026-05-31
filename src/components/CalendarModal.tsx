import { useState } from 'react';
import { PostListItem } from '../lib/types';
import { useNavigate } from 'react-router-dom';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostListItem[];
}

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const typeColors: Record<string, string> = {
  billet: '#2C4A7C',
  avant_propos: '#B8860B',
  pensee: '#6B4C8C',
};

const typeLabels: Record<string, string> = {
  billet: 'Billet',
  avant_propos: 'Avant-propos',
  pensee: 'Pensée',
};

export function CalendarModal({ isOpen, onClose, posts }: CalendarModalProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  if (!isOpen) return null;

  // Calculs calendrier
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Map des posts par jour
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

  const navigate = useNavigate();

  function handleDayClick(day: number) {
  const post = postMap[day];
  if (!post) return;
  navigate(`/posts/${post.slug.current}`);
  onClose();
  }

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 99998,
        }}
      />

      {/* MODAL */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FAFAF7',
          borderRadius: '24px 24px 0 0',
          zIndex: 99999,
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
        }}
      >
        {/* DRAG HANDLE */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
          <div style={{ width: '40px', height: '4px', background: '#ddd', borderRadius: '2px' }} />
        </div>

        <div style={{ padding: '16px 24px 32px' }}>

          {/* TITRE + FERMER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1A1A1A' }}>
              Allez droit à vos billets
            </h2>
            <button
              onClick={onClose}
              style={{
                background: '#E8E5DF',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          {/* NAVIGATION MOIS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button
              onClick={prevMonth}
              style={{
                background: 'transparent',
                border: '1px solid #E8E5DF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              ◀
            </button>
            <span style={{ fontSize: '16px', fontWeight: 500, textTransform: 'capitalize' }}>
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              style={{
                background: 'transparent',
                border: '1px solid #E8E5DF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              ▶
            </button>
          </div>

          {/* EN-TÊTE JOURS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '8px' }}>
            {WEEKDAYS.map(d => (
              <div
                key={d}
                style={{
                  textAlign: 'center',
                  fontSize: '11px',
                  color: '#999',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '4px 0',
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* GRILLE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>

            {/* Cases vides */}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Jours */}
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
                    background: post ? '#f5f5f0' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: post ? 600 : 400,
                      color: post ? '#1A1A1A' : '#ccc',
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
                        background: typeColors[post.type] || '#999',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* LÉGENDE */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid #E8E5DF',
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
                <span style={{ fontSize: '11px', color: '#888' }}>{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}