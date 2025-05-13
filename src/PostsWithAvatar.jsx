// src/components/PostsWithAvatar.jsx
import React, { useEffect, useState } from "react";

const PostsWithAvatar = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    ]).then(([postsData, usersData]) => {
      setPosts(postsData);
      setUsers(usersData);
    });
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Posts with Avatars</h2>
      {posts.map((post) => {
        const userName = getUserName(post.userId);
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          userName
        )}&background=random&rounded=true`;

        return (
          <div
            key={post.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1.5rem",
              gap: "1rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            <img src={avatarUrl} alt={userName} width={48} height={48} />
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>Author: {userName}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostsWithAvatar;
