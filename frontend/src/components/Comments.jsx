import React, { useState } from 'react'
import {
  postComment,
  updateComment,
  deleteComment
} from '../services/commentService'

const CommentSection = ({
  animeId,
  userId,
  username,
  comments,
  setComments
}) => {
  const [newCommentText, setNewCommentText] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const handleAddComment = async (e) => {
    e.preventDefault()
    try {
      const newComment = await postComment({
        animeId,
        userId,
        username,
        text: newCommentText
      })
      setComments((prevComments) => [...prevComments, newComment])
      setNewCommentText('')
    } catch (error) {
      console.error('Failed to add comment', error)
    }
  }

  const startEditing = (commentId, currentText) => {
    setEditingCommentId(commentId)
    setEditingText(currentText)
  }

  const cancelEditing = () => {
    setEditingCommentId(null)
    setEditingText('')
  }

  const submitEdit = async (e) => {
    e.preventDefault()
    try {
      await updateComment(editingCommentId, { text: editingText })
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === editingCommentId
            ? { ...comment, text: editingText }
            : comment
        )
      )
      cancelEditing()
    } catch (error) {
      console.error('Failed to update comment', error)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId)
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      )
    } catch (error) {
      console.error('Failed to delete comment', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleAddComment}>
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            {editingCommentId === comment._id ? (
              <form onSubmit={submitEdit}>
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  required
                />
                <button type="submit">Update Comment</button>
                <button type="button" onClick={cancelEditing}>
                  Cancel🚫
                </button>
              </form>
            ) : (
              <>
                <p>{comment.text}</p>
                {comment.userId === userId && (
                  <>
                    <button
                      onClick={() => startEditing(comment._id, comment.text)}
                    >
                      Edit✍️
                    </button>
                    <button onClick={() => handleDelete(comment._id)}>
                      Delete❌
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentSection