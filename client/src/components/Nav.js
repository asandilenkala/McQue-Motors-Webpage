import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

    return (
        <div>
            <ul className='header-list'>
                <li><Link to='/'><strong>Home</strong></Link></li>
                <li><Link to='/cars'><strong>Cars</strong></Link></li>
                <li><Link to='/about'><strong>About</strong></Link></li>
                <li><Link to='/McQue-Motors-stuffdashboard'><strong>Dashboard</strong></Link></li>
                <li><Link to='/signup'>Signup</Link></li>
            </ul>
        </div>
    )
} 

export default Nav;