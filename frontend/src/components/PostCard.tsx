"use client"

import type React from "react"
import { useState } from "react"
import type { Post } from "./PostApp"
import "../styles/PostCard.css"

interface PostCardProps {
  post: Post
  onLike: (postId: number) => void
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="post-card">
      <div className="post-image">
        <img
          src={imageError ? "https://via.placeholder.com/400x300?text=Image+Not+Found" : post.image}
          alt={post.title}
          onError={handleImageError}
        />
      </div>

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-description">{post.description}</p>

        <div className="post-actions">
          <button className="like-button" onClick={() => onLike(post.id)} aria-label="Like post">
            <span className="heart-icon">❤️</span>
            <span className="like-count">{post.likes.totalLikes}</span>
          </button>
        </div>

        <div className="post-likes">
          {post.likes.totalLikes > 0 ? (
            <>
             
            </>
          ) : (
            <span className="no-likes">Be the first to like this post</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCard