import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);

    try {
      await axios.post('https://chat-app-mern-i2ao.onrender.com/api/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Registered successfully! Redirecting...', {
        position: 'top-center',
        autoClose: 1500,
      });

      setTimeout(() => navigate('/login'), 1600);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-blue-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="block text-sm text-gray-600">Upload Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-3 py-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 hover:file:bg-blue-200"
          />

          {preview && (
            <div className="flex justify-center mt-2">
              <img
                src={preview}
                alt="Avatar preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Register
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
