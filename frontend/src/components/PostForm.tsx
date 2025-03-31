"use client"

import type React from "react"
import { useState } from "react"
import "../styles/PostForm.css"

interface PostFormProps {
  onCreatePost: (title: string, description: string, image: string) => void
}

const PostForm: React.FC<PostFormProps> = ({ onCreatePost }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!image.trim()) {
      newErrors.image = "Image URL is required"
    } else if (!isValidUrl(image)) {
      newErrors.image = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onCreatePost(title, description, image)
      setTitle("")
      setDescription("")
      setImage("")
      setErrors({})
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          className={errors.title ? "error" : ""}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us more about it..."
          rows={4}
          className={errors.description ? "error" : ""}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className={errors.image ? "error" : ""}
        />
        {errors.image && <span className="error-message">{errors.image}</span>}
      </div>

      {image && (
        <div className="image-preview">
          <p>Image Preview:</p>
          <img
            src={image || "/placeholder.svg"}
            alt="Preview"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150?text=Invalid+Image"
            }}
          />
        </div>
      )}

      <button type="submit" className="submit-button">
        Create Post
      </button>
    </form>
  )
}

export default PostForm