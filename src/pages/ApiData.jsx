import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const postsPerPage = 6;

  // Fetch posts from JSONPlaceholder API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
        <Button onClick={fetchPosts} variant="primary">
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-4">API Data - Blog Posts</h1>
        
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-gray-600 dark:text-gray-400">
          Showing {currentPosts.length} of {filteredPosts.length} posts
        </p>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 capitalize">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Post #{post.id} by User {post.userId}
            </p>
            <p className="text-gray-800 dark:text-gray-200 line-clamp-3">
              {post.body}
            </p>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="p-4">
          <div className="flex justify-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ApiData;