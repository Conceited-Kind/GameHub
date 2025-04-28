import { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { auth, database } from '../firebase/config';
import ForumPost from '../components/community/ForumPost';

function Community() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const postsRef = ref(database, 'posts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postList = [];
      if (data) {
        Object.entries(data).forEach(([id, post]) => {
          postList.push({ id, ...post });
        });
      }
      console.log('Fetched posts:', postList);
      setPosts(postList.reverse());
    }, (err) => {
      setError('Failed to load posts. Please try again.');
      console.error('Fetch posts error:', err.message, err.code);
    });
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log('Post button clicked', { newPost, user: auth.currentUser });
    if (!auth.currentUser) {
      setError('Please log in to post.');
      console.log('No authenticated user');
      return;
    }
    if (!newPost.trim()) {
      setError('Post content cannot be empty.');
      console.log('Empty post content');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const postsRef = ref(database, 'posts');
      console.log('Pushing post to:', 'posts');
      await push(postsRef, {
        content: newPost,
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
        timestamp: Date.now(),
      });
      console.log('Post submitted successfully');
      setNewPost('');
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error('Post submission error:', err.message, err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold text-primary mb-6 animate-fade-in">Community Hub</h1>
      <form onSubmit={handlePostSubmit} className="mb-8">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          rows="4"
          disabled={loading}
        />
        {error && (
          <p className="text-highlight mt-2">{error}</p>
        )}
        <button
          type="submit"
          className="mt-2 bg-primary text-white p-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={!newPost.trim() || !auth.currentUser || loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
      <div className="space-y-4">
        {posts.length === 0 && !error && (
          <p className="text-center text-lg text-gray-600">No posts yet. Be the first to share!</p>
        )}
        {error && (
          <p className="text-center text-highlight">{error}</p>
        )}
        {posts.map((post) => (
          <ForumPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Community;