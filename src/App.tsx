
import { Routes, Route } from 'react-router-dom';

import ResponsiveAppBar from './components/navbar';


import ChapterTest from './components/chaptertest';
import ChapterPage from './components/chapter';
import UserCore from './components/usercore';
import UserCoreTest from './components/usercoretest';




function App() {

  return (
    <>
    <ResponsiveAppBar />
    
      
      <Routes>
        <Route path="/" element={<UserCore />} />
        <Route path="/chaptertest" element={<ChapterTest />} />
        <Route path="/usercore" element={<UserCore />} />
        <Route path="/usercoretest" element={<UserCoreTest />} />
        <Route path="/chapter" element={<ChapterPage/>} />
       
      
      </Routes>
    </>
  );
}

export default App;
