import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  import { useEffect } from 'react';

function App() {


useEffect(() => {
  const updateLastActive = () => {
    localStorage.setItem('lastActive', Date.now());
  };

  updateLastActive();
  window.addEventListener('mousemove', updateLastActive);
  window.addEventListener('keydown', updateLastActive);
  window.addEventListener('focus', updateLastActive);

  return () => {
    window.removeEventListener('mousemove', updateLastActive);
    window.removeEventListener('keydown', updateLastActive);
    window.removeEventListener('focus', updateLastActive);
  };
}, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Toasts appear on every page */}
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}

export default App;
