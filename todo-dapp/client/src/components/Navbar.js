import React from 'react';
import { useWeb3 } from './Auth';

const Navbar = () => {
  const { account, isRegistered, register } = useWeb3();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">EthTodo</div>
      <div className="flex items-center space-x-4">
        {account && (
          <>
            <span className="bg-gray-700 px-3 py-1 rounded">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            {!isRegistered && (
              <button 
                onClick={register}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Register
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;