import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { usePosts } from './hooks/usePosts';
import { BilletView } from './components/BilletView';
import { AvantProposView } from './components/AvantProposView';
import { PenseeView } from './components/PenseeView';
import { CalendarModal } from './components/CalendarModal';
import { Navigation } from './components/Navigation';
import { Post } from './lib/types';
import { TopNavigation } from './components/TopNavigation';
import { LanguageProvider } from './contexts/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';
import { useTranslatedPost } from './hooks/useTranslatedPost';

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getPostById, getLatestPost, getAllPostsForCalendar, loading } = usePosts();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const currentPostData = id ? getPostById(id) : getLatestPost();

  const post = currentPostData?.post || null;
  const prev = currentPostData?.prev || null;
  const next = currentPostData?.next || null;

  const { post: translatedPost, translating } = useTranslatedPost(post);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const goToPrev = useCallback(() => {
    if (prev) navigate(`/posts/${prev}`);
  }, [prev, navigate]);

  const goToNext = useCallback(() => {
    if (next) navigate(`/posts/${next}`);
  }, [next, navigate]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    trackMouse: false,
    trackTouch: true,
    delta: 50,
  });

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFAF7',
        fontSize: '18px',
        color: '#6B6B6B'
      }}>
        Chargement...
      </div>
    );
  }

  if (!translatedPost) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFAF7',
        fontSize: '18px',
        color: '#6B6B6B'
      }}>
        Publication non trouvée
      </div>
    );
  }

  const renderPost = (post: Post) => {
    switch (post.type) {
      case 'billet': return <BilletView post={post} />;
      case 'avant_propos': return <AvantProposView post={post} />;
      case 'pensee': return <PenseeView post={post} />;
      default: return null;
    }
  };

  return (
    <div {...swipeHandlers} style={{ minHeight: '100vh' }}>
      <TopNavigation
        prevSlug={prev || undefined}
        nextSlug={next || undefined}
      />
      <LanguageToggle translating={translating} />
      {renderPost(translatedPost)}
      <Navigation onCalendarOpen={() => setIsCalendarOpen(true)} />
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        posts={getAllPostsForCalendar()}
      />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PostPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;