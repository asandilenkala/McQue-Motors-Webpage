import React from 'react';
import { Link } from 'react-router-dom';
import adminicon from '../components/adminicon.jpg';


const Nav = () => {

    return (
        <div>
            <ul className='header-list'>
                <li><Link to='/'><strong>Home</strong></Link></li>
                <li><Link to='/cars'><strong>Cars</strong></Link></li>
                <li><Link to='/about'><strong>About</strong></Link></li>
                <li><Link to='/McQue-Motors-stuffdashboard'><strong>Sign in</strong></Link></li>
            </ul>
    
        </div>
    )
} 

export default Nav;