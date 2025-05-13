import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './album.css';

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
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

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  if (!album || !user) return <p>Loading...</p>;

  return (
    <div className="album-detail">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Show Album
      </button>

      <div className="info-container">
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

        <h3>{album.title}</h3>

        <div className="photo-grid">
          {photos.map((photo, index) => (
            <img
              key={photo.id}
              src={photo.thumbnailUrl}
              alt={photo.title}
              onClick={() => openLightbox(index)}
              className="photo-thumb"
            />
          ))}
        </div>
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={photos[photoIndex].url}
          nextSrc={photos[(photoIndex + 1) % photos.length].url}
          prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % photos.length)
          }
          imageCaption={photos[photoIndex].title}
          enableZoom={true}
        />
      )}
    </div>
  );
}

export default AlbumDetail;
