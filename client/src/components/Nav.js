import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import adminicon from '../components/adminicon.jpg';


const Nav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        navigate('/admin-login');
    };

    return (
        <div>
            <ul className='header-list'>
                <li><Link to='/'><strong>Home</strong></Link></li>
                <li><Link to='/cars'><strong>Cars</strong></Link></li>
                <li><Link to='/about'><strong>About</strong></Link></li>
                {token && (
                <li><Link to='/McQue-Motors-stuffdashboard'><strong>Dashboard</strong></Link></li>
                )}

                {token ? (
                    <li><button onClick={handleLogout}><strong>Sign Out</strong></button></li>
                ) : (
                    <li><Link to='/McQue-Motors-stuffdashboard'><strong>Sign in</strong></Link></li>
                )} 
            </ul>
    
        </div>
    )
} 

export default Nav;