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

function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getPostBySlug, getLatestPost, getAllPostsForCalendar } = usePosts();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const currentPostData = slug
    ? getPostBySlug(slug)
    : { post: getLatestPost(), next: null, prev: null };

  const post = currentPostData.post;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const goToPrev = useCallback(() => {
    if (currentPostData.prev) {
      navigate(`/posts/${currentPostData.prev}`);
    }
  }, [currentPostData.prev, navigate]);

  const goToNext = useCallback(() => {
    if (currentPostData.next) {
      navigate(`/posts/${currentPostData.next}`);
    }
  }, [currentPostData.next, navigate]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    trackMouse: false,
    trackTouch: true,
    delta: 50,
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-xl">
        Publication non trouvée
      </div>
    );
  }

  const renderPost = (post: Post) => {
    switch (post.type) {
      case 'billet':
        return <BilletView post={post} />;
      case 'avant_propos':
        return <AvantProposView post={post} />;
      case 'pensee':
        return <PenseeView post={post} />;
      default:
        return null;
    }
  };

  return (
    <div {...swipeHandlers} style={{ minHeight: '100vh' }}>
    <TopNavigation
      prevSlug={currentPostData.prev || undefined}
      nextSlug={currentPostData.next || undefined}
    />
      {renderPost(post)}

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
    <Router>
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/posts/:slug" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;