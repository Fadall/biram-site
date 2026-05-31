interface NavigationProps {
  onCalendarOpen: () => void;
}

export function Navigation({ onCalendarOpen }: NavigationProps) {
  return (
    <button
      onClick={onCalendarOpen}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        zIndex: 9999,
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'rgba(26, 26, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseDown={(e) => {
        (e.target as HTMLElement).style.transform = 'scale(0.92)';
      }}
      onMouseUp={(e) => {
        (e.target as HTMLElement).style.transform = 'scale(1)';
      }}
      onTouchStart={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(0.92)';
      }}
      onTouchEnd={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
      }}
    >
      📅
    </button>
  );
}