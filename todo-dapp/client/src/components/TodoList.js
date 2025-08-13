import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import { useWeb3 } from './Auth';

const TodoList = () => {
  const { account, contract, isRegistered } = useWeb3();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!contract || !isRegistered) return;
      
      setLoading(true);
      try {
        const result = await contract.methods.getTodos().call({ from: account });
        setTodos(result);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
      setLoading(false);
    };

    fetchTodos();
  }, [contract, account, isRegistered]);

  const handleToggle = async (id) => {
    try {
      await contract.methods.toggleCompleted(id).send({ from: account });
      const updatedTodos = [...todos];
      updatedTodos[id].completed = !updatedTodos[id].completed;
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const addTodo = async (content) => {
    try {
      await contract.methods.createTodo(content).send({ from: account });
      const newTodo = {
        id: todos.length,
        content,
        completed: false
      };
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  if (!isRegistered) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Todos</h2>
      
      <AddTodo onAdd={addTodo} />
      
      {loading ? (
        <div className="text-center py-8">Loading todos...</div>
      ) : todos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No todos yet. Add your first task!</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li key={todo.id} className="py-4 flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="h-5 w-5 text-blue-600 rounded mr-4"
              />
              <span 
                className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
              >
                {todo.content}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;