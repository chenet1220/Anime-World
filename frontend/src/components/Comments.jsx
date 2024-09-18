import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ animeId, userId, username }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetch comments when the component loads
    useEffect(() => {
        axios.get(`/api/comments/${animeId}`)
            .then(response => setComments(response.data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [animeId]);

    // Handle submitting a new comment
    const handleCommentSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/comments', { animeId, userId, username, text: newComment })
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => console.error('Error posting comment:', error));
    };

    // Handle deleting a comment
    const handleDeleteComment = (commentId) => {
        axios.delete(`/api/comments/${commentId}`)
            .then(() => {
                setComments(comments.filter(comment => comment._id !== commentId));
            })
            .catch(error => console.error('Error deleting comment:', error));
    };

    // Handle editing a comment
    const handleEditComment = (commentId, updatedText) => {
        axios.put(`/api/comments/${commentId}`, { text: updatedText })
            .then(response => {
                setComments(comments.map(comment => comment._id === commentId ? response.data : comment));
            })
            .catch(error => console.error('Error editing comment:', error));
    };

    return (
        <div className="comment-section">
            <h2>Comments</h2>

            {/* Comment form */}
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    required
                />
                <button type="submit">Post Comment</button>
            </form>

            {/* Display comments */}
            <ul className="comments-list">
                {comments.map(comment => (
                    <li key={comment._id}>
                        <p><strong>{comment.username}</strong> <em>{new Date(comment.date).toLocaleString()}</em></p>
                        <p>{comment.text}</p>

                        {/* Show buttons for editing or deleting */}
                        {userId === comment.userId && (
                            <div>
                                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                <button onClick={() => {
                                    const updatedText = prompt('Edit your comment:', comment.text);
                                    if (updatedText) handleEditComment(comment._id, updatedText);
                                }}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;
