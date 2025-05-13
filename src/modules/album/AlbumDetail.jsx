import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './album.css'

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // B1: Lấy album
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then(res => res.json())
      .then(data => {
        setAlbum(data);
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then(res => res.json())
      .then(userData => {
        setUser(userData);
        return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}&_limit=10`);
      })
      .then(res => res.json())
      .then(photoData => setPhotos(photoData));
  }, [id]);

  if (!album || !user) return <p>Loading...</p>;

  return (
    <div className="album-detail">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Albums
      </button>

      <div className="user-info">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          alt={`${user.name} avatar`}
          className="avatar"
        />
        <div>
          <Link to={`/users/${user.id}`} className="user-name-link"><h2>{user.name}</h2></Link>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
      </div>

      <h3>Album: {album.title}</h3>

      <div className="photo-grid">
        {photos.map(photo => (
          <a key={photo.id} href={photo.url} target="_blank" rel="noopener noreferrer">
            <img src={photo.thumbnailUrl} alt={photo.title} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default AlbumDetail;
