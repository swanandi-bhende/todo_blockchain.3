import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      await onAdd(content);
      setContent('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className={`px-6 py-2 rounded-r-lg ${
            loading || !content.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium transition-colors`}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default AddTodo;