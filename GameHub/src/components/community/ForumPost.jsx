import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { auth, database } from '../../firebase/config';

function ForumPost({ post }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const date = new Date(post.timestamp).toLocaleString();

  const handleDelete = async () => {
    if (!auth.currentUser) {
      setError('Please log in to delete your post.');
      console.log('No authenticated user');
      return;
    }
    if (auth.currentUser.uid !== post.userId) {
      setError('You can only delete your own posts.');
      console.log('Unauthorized delete attempt');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const postRef = ref(database, `posts/${post.id}`);
      console.log('Deleting post:', post.id);
      await remove(postRef);
      console.log('Post deleted successfully');
    } catch (err) {
      setError('Failed to delete post. Please try again.');
      console.error('Delete post error:', err.message, err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600">Posted by: {post.email}</p>
          <p className="mt-2">{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">{date}</p>
        </div>
        {auth.currentUser && auth.currentUser.uid === post.userId && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}

export default ForumPost;