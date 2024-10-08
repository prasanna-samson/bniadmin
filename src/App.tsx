import { Routes, Route, Navigate } from 'react-router-dom';

import ResponsiveAppBar from './components/navbar';
import ChapterTest from './components/chaptertest';
import ChapterPage from './components/chapter';
import UserCore from './components/usercore';
import UserCoreTest from './components/usercoretest';
import ProtectedRoute from './route/protected-route';
import LoginPage from './components/login-page';
import MemberPage from './components/member';

const App: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />
      
      <Routes>
      <Route path="/" element={<Navigate to="/usercore" />} />
        <Route path="/chaptertest" element={<ProtectedRoute element={<ChapterTest />} />} />
        <Route path="/usercore" element={<ProtectedRoute element={<UserCore />} />} />
        <Route path="/members" element={<ProtectedRoute element={<MemberPage />} />} />

        <Route path="/usercoretest" element={<ProtectedRoute element={<UserCoreTest />} />} />
        <Route path="/chapter" element={<ProtectedRoute element={<ChapterPage />} />} />
        {/* Add a route for the login page */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
