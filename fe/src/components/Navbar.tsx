import React from 'react';
import { Link } from 'react-router-dom';
import './headerStyles.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigator = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigator('/login')
    }

    return (
        <div className='header'>
            <h2 className='headTitle'>Ecom Store</h2>
            <nav>
                <Link to='/'>Products</Link>
                <Link to='/cart'>Cart</Link>
                <p className='logout' onClick={handleLogOut}>Logout</p>
            </nav>
        </div>
    )
}

export default Navbar;