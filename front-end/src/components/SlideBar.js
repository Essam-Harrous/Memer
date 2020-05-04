import React from 'react';
import { Link } from 'react-router-dom';

const SlideBar = () => {
  return (
    <nav id='sidebar'>
      <div className='sidebar-header'>
        <Link to='/editor' className='btn btn-primary rounded'>
          Create Meme
        </Link>
      </div>

      <ul className='list-unstyled components'>
        <p>Dummy Heading</p>
        <li className='active'>
          <a
            href='#homeSubmenu'
            data-toggle='collapse'
            aria-expanded='false'
            className='dropdown-toggle'
          >
            Home
          </a>
          <ul className='collapse list-unstyled' id='homeSubmenu'>
            <li>
              <a href='#'>Home 1</a>
            </li>
            <li>
              <a href='#'>Home 2</a>
            </li>
            <li>
              <a href='#'>Home 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#'>About</a>
        </li>
        <li>
          <a
            href='#pageSubmenu'
            data-toggle='collapse'
            aria-expanded='false'
            className='dropdown-toggle'
          >
            Pages
          </a>
          <ul className='collapse list-unstyled' id='pageSubmenu'>
            <li>
              <a href='#'>Page 1</a>
            </li>
            <li>
              <a href='#'>Page 2</a>
            </li>
            <li>
              <a href='#'>Page 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#'>Portfolio</a>
        </li>
        <li>
          <a href='#'>Contact</a>
        </li>
      </ul>
    </nav>
  );
};
export default SlideBar;
