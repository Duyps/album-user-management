import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './user.css'
function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            setUsers(res.data);
        })
    },[])

  return (
    <div className="main">
        <h2 className='title'>User</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th className='id'>ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&rounded=true`}
                                alt={user.name}
                                className="avatar"
                            />
                        </td>
                        <td>{user.name}</td>
                        <td>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>
                            <a href={`tel:${user.phone}`}>{user.phone}</a>
                        </td>
                        <td>
                            <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
                        </td>
                        <td>
                            <Link to={`/users/${user.id}`} className="show-button">Show</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserList