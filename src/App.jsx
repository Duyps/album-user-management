import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import AlbumList from './modules/album/AlbumList';
import PostsWithAvatar from './PostsWithAvatar';
import AlbumDetail from './modules/album/AlbumDetail';
import UserList from './modules/user/UserList';
import UserDetail from './modules/user/UserDetail';
import Header from './components/header/Header';
import PageLayout from './PageLayout';

function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <div className="page-layout">
        <div className="side">
          <Sidebar />
        </div>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<AlbumList />} />
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/albums/:id" element={<AlbumDetail />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  )
}

export default App
