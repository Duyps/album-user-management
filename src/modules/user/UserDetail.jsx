import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import './user.css';

function UserDetail() {
    const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [userRes, albumRes] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
        axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      ]);
      setUser(userRes.data);
      setAlbums(albumRes.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="main">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Show User
      </button>

      <div className="user-info">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&rounded=true`}
          alt={`${user.name} avatar`}
          className="avatar"
        />
        <div className='infor'>
          <Link to={`/users/${user.id}`} className="user-name-link"><h2>{user.name}</h2></Link>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
      </div>

      <h3 className="title">Albums by {user.name}</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {albums.map(album => (
            <tr key={album.id}>
              <td>{album.id}</td>
              <td>{album.title}</td>
              <td>
                <Link to={`/albums/${album.id}`} className="show-button">Show</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetail