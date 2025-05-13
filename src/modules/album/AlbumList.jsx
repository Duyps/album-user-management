import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [params, setParams] = useSearchParams();
    const page = parseInt(params.get("page")) || 1;
    const defaultPageSize = 10;
    const allowedSizes = [10, 20,50, 100];
    const pageSize = allowedSizes.includes(parseInt(params.get("size")))? parseInt(params.get("size")):defaultPageSize;

    const paginated = albums.slice((page-1)* pageSize, page* pageSize);

    const totalPages = Math.ceil(albums.length / pageSize);
    useEffect(() => {
        const fetchData = async() => {
            const [albumRes, userRes] = await Promise.all([
                axios.get("https://jsonplaceholder.typicode.com/albums"),
                axios.get("https://jsonplaceholder.typicode.com/users"),
            ]);
            
            setAlbums(albumRes.data);
            setUsers(userRes.data);
            setLoading(false);
        };
        fetchData();
    }, [])


    if (loading) return <p>Loading...</p>

  return (
    <>
    <div className="main">
        <table className='table'>
            <thead>
                <tr>
                    <th className='id'>ID</th>
                    <th>Title</th>
                    <th>User</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {paginated.map(album => {
                    const user = users.find(u => u.id === album.userId);
                    return (
                    <tr key={album.id}>
                        <td className='album-id'>{album.id}</td>
                        <td>{album.title}</td>
                        <td>
                        <Link to={`/users/${user.id}`} className="user-link">
                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&rounded=true`} alt={user.name} className="avatar" />
                            {user.name}
                        </Link>
                        </td>
                        <td>
                        <Link to={`/albums/${album.id}`} className="show-button">Show</Link>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
                
       
        <div style={{ marginBottom: "16px" }} className='perpage' >
            <label htmlFor="size">Albums per page: </label>
            <select
                id="size"
                value={pageSize}
                onChange={e => setParams({ page: 1, size: e.target.value })}
            >
                {allowedSizes.map(size => (
                <option key={size} value={size}>{size}</option>
                ))}
            </select>
        </div>
        <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setParams({ page: i + 1 , size: pageSize})}
            className={page === i + 1 ? "page-button active" : "page-button"}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    </>
  )
}

export default AlbumList