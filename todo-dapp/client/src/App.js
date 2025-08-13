import React from 'react';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import { AuthProvider } from './components/Auth';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <TodoList />
        </main>
        
        <footer className="mt-12 text-center text-gray-600 py-6">
          <p>EthTodo - Decentralized Task Management on Ethereum</p>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;