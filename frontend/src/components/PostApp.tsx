"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import PostForm from "./PostForm";
import PostCard from "./PostCard";
import { createPost, fetchPosts, toggleLike } from "../api/postApi";
import "../styles/PostApp.css";
import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
}

export interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    likes: {
        totalLikes: number;
        recentLikedBy: User[];
    };
}

const PostApp: React.FC = () => {
    const queryClient = useQueryClient();
    const [userId, setUserId] = useState<number>(1);
    const [page, setPage] = useState<number>(0);
    const [pageSize] = useState<number>(3); 
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId ? parseInt(storedUserId, 10) : 1);

        if (storedUserId == null) {
            navigate("/");
        }
    }, [navigate]);

    // Fetch posts with pagination
    const { data: rawData = [], isLoading, isError } = useQuery({
        queryKey: ["posts", page],
        queryFn: () => fetchPosts(page, pageSize),
        placeholderData: keepPreviousData,
    });

    const posts = Array.isArray(rawData) && Array.isArray(rawData[0]) ? rawData[0] : [];

    const createPostMutation = useMutation({
        mutationFn: (newPost: { userId: number; title: string; description: string; imageUrl: string }) =>
            createPost(newPost.userId, newPost.title, newPost.description, newPost.imageUrl),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    const toggleLikeMutation = useMutation({
        mutationFn: ({ postId, userId }: { postId: number; userId: number }) => toggleLike(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    const handleCreatePost = (title: string, description: string, image: string) => {
        createPostMutation.mutate({ userId, title, description, imageUrl: image });
    };

    const handleLike = (postId: number) => {
        toggleLikeMutation.mutate({ postId, userId });
    };

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 0));

    return (
        <div className="post-app">
            <header className="app-header">
                <h1>Social Feed</h1>
            </header>

            <main className="app-content">
                {/* Post Creation Form */}
                <section className="form-section">
                    <h2>Create a New Post</h2>
                    <PostForm onCreatePost={handleCreatePost} />
                </section>

                {/* Posts Feed */}
                <section className="posts-section">
                    <h2>Feed</h2>

                    {isLoading && <p>Loading posts...</p>}
                    {isError && <p>Error loading posts.</p>}

                    {!isLoading && !isError && posts.length === 0 && (
                        <div className="empty-state">
                            <p>No posts yet. Create your first post above!</p>
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <div>
                            <div className="posts-grid">
                                {posts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={{
                                            id: Number(post.id),
                                            title: post.title,
                                            description: post.description,
                                            image: post.image_url,
                                            likes: {
                                                totalLikes: Number(post.TotalLikes) || 0,
                                                recentLikedBy: post.RecentLikedBy || [],
                                            },
                                        }}
                                        onLike={handleLike}
                                    />
                                ))}
                            </div>

                            <div className="pagination">
                                <button onClick={handlePreviousPage} disabled={page === 0}>
                                    Previous
                                </button>
                                <span>Page {page + 1}</span>
                                <button onClick={handleNextPage} disabled={posts.length < pageSize}>
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default PostApp;