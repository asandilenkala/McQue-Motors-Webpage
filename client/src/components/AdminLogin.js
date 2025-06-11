import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/admin/login', {  
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token); // Store the token
                navigate('/McQue-Motors-stuffdashboard'); // Redirect to Dashboard
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error. Try again later.');
        } 
    };
    

    return (
        <div className='Admin-login'>
            <h1>Stuff Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin} className='Admin-login-form'>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" className='button' >Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
