import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import { CiShoppingBasket } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.basket);
  const totalItems = product.reduce((sum, item) => sum + item.count, 0);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim()) {
        navigate(`/search?q=${searchTerm}`);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="header-row">
      <div className="flex-row" onClick={() => navigate("/")}>
        <img className="logo" src="./src/images/images.png" alt="logo" />
        <p className='marka'>Online Mağaza</p>
      </div>

      <div className="header-actions">
        <input
          className='search-input'
          type='text'
          placeholder='bir şeyler ara..'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />

        <Badge onClick={() => dispatch(setDrawer())} badgeContent={totalItems} color="success">
          <CiShoppingBasket className="icon" />
        </Badge>

        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="dark-toggle-btn"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}

export default Header;
