import React, { useState } from "react";
import CommentService from "../services/commentService";
import { useAuth } from "../contexts/AuthProvider";

function CommentSection({
  comments = [],
  blogId,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}) {
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const commentService = new CommentService();

  // ✅ Submit new comment
  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const created = await commentService.create(Number(blogId), newComment);

      onAddComment({
        ...created,
        username: currentUser.username,
      });

      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
      alert("Failed to post comment. Please try again.");
    }
  };

  // ✅ Start editing comment
  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  // ✅ Save edited comment
  const handleSaveEdit = async (commentId) => {
    if (!editedContent.trim()) return;

    try {
      const updated = await commentService.update(commentId, editedContent);

      // Update the parent comment list
      onUpdateComment(updated);
      setEditingCommentId(null);
      setEditedContent("");
    } catch (error) {
      console.error("Failed to update comment:", error);
      alert("Failed to update comment. Please try again.");
    }
  };

  // ✅ Delete comment
  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await commentService.delete(commentId);
      onDeleteComment(commentId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 rounded-md p-4 mt-4">
      <h3 className="text-md font-semibold text-gray-800 mb-3">Comments</h3>

      {/* Existing Comments */}
      <div className="space-y-3 mb-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first!
          </p>
        ) : (
          comments.map((c, index) => (
            <div
              key={c.id + index}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {c?.user?.username}
                  </p>
                  <p className="text-xs text-gray-400">{c.date}</p>
                </div>

                {/* Show edit/delete buttons if it's the owner */}
                {c.userId === currentUser.id && (
                  <div className="flex gap-2">
                    {editingCommentId === c.id ? null : (
                      <>
                        <button
                          onClick={() => handleEdit(c)}
                          className="text-xs text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Comment content */}
              {editingCommentId === c.id ? (
                <div className="mt-2">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows="2"
                    className="w-full text-sm p-2 border border-gray-300 rounded-md resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveEdit(c.id)}
                      className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-3 py-1 text-xs bg-gray-300 hover:bg-gray-400 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 mt-2">{c.content}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add New Comment */}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        rows="2"
        className="w-full text-sm p-2 border border-gray-300 rounded-md resize-none"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="self-end px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white text-sm rounded-md transition-all"
      >
        Post Comment
      </button>
    </div>
  );
}

export default CommentSection;
