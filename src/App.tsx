import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Top from './pages/common/Top';
import Bottom from './pages/common/Bottom';
import Join from './pages/user/Join';
import Login from './pages/user/Login';
// import Main from './pages/Main';
import FindPassWord from './pages/user/FindPassWord';
import LibraryList from './pages/library/LibraryList';

export const CURRENT_HOMEPAGE_VERSION = process.env.REACT_APP_VERSION;

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ flex: '0 1 auto' }}>
          <Top />
        </div>
        <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
          <Routes>
            {/* <Route path="/" element={<Main />} /> */}
            <Route path="/" element={<LibraryList />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/join" element={<Join />} />
            <Route path="/user/findpw" element={<FindPassWord />} />
            <Route path="/library/list" element={<LibraryList />} />
          </Routes>
        </div>
        <div style={{ flex: '0 1 auto' }}>
          <Bottom />
        </div>
      </div>
    </Router>
  );
}

export default App;