import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your components here
import Button from './components/Button';
import TaskManager from './components/TaskManager';
import ApiData from './pages/ApiData';

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Router basename="/week-3-react-js-assignment-CHEGEBB">
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
          {/* Header/Navbar */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  PLP Task Manager
                </h1>
                
                <div className="flex items-center space-x-6">
                  <nav className="flex space-x-4">
                    <Link 
                      to="/" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Home
                    </Link>
                    <Link 
                      to="/api-data" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      API Data
                    </Link>
                  </nav>
                  
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
            <Routes>
              <Route path="/" element={
                <div className="space-y-8">
                  {/* Demo Counter Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="text-center">
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        Edit <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">src/App.jsx</code> and save to test HMR
                      </p>
                      
                      <div className="flex items-center justify-center gap-4">
                        <Button 
                          variant="danger" 
                          onClick={() => setCount((count) => count - 1)}
                          className="w-12 h-12 text-xl font-bold"
                        >
                          -
                        </Button>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white px-6">
                          {count}
                        </span>
                        <Button 
                          variant="primary" 
                          onClick={() => setCount((count) => count + 1)}
                          className="w-12 h-12 text-xl font-bold"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Task Manager */}
                  <TaskManager />
                </div>
              } />
              <Route path="/api-data" element={<ApiData />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Built with React, Tailwind CSS, and ❤️
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;