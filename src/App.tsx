import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomeList } from './routes/HomeList';
import { IdeaDetail } from './routes/IdeaDetail';
import { RecommendationsPage } from './routes/RecommendationsPage';
import { AboutPage } from './routes/AboutPage';
import { NotFound } from './routes/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomeList />} />
        <Route path="idea/:slug" element={<IdeaDetail />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
