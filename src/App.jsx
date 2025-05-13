import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import AlbumList from './modules/album/AlbumList';
import PostsWithAvatar from './PostsWithAvatar';
import AlbumDetail from './modules/album/AlbumDetail';
import UserList from './modules/user/UserList';
import UserDetail from './modules/user/UserDetail';

function App() {
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<AlbumList />} />
          <Route path="/albums/:id" element={<AlbumDetail/>} />
          <Route path="/users" element={<UserList/>} />
          <Route path="/users/:id" element={<UserDetail/>} />
        </Routes>
      </div>
    </div>
    
  )
}

export default App
