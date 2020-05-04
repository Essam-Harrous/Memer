import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className='navbar navbar-expand-xl navbar-dark bg-dark fixed-top'>
      <div className='navbar-collapse collapse w-100 order-1 order-md-0 '>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Log Out
            </a>
          </li>
          <li className='nav-item'>
            <a
              data-toggle='modal'
              data-target='#signIn'
              className='nav-link'
              href='#'
            >
              Sign In
            </a>
          </li>
          <li className='nav-item'>
            <a
              data-toggle='modal'
              data-target='#signUp'
              className='nav-link'
              href='#'
            >
              Sign Up
            </a>
          </li>
        </ul>
      </div>
      <div className='mx-auto order-0'>
        <Link to='/' className='navbar-brand mx-auto'>
          Memer
        </Link>
      </div>
      {/* <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='.dual-collapse2'
      >
        <span className='navbar-toggler-icon'></span>
      </button> */}
      <button type='button' id='sidebarCollapse' className='navbar-toggler'>
        <i className='fas fa-align-right'></i>
      </button>
      <div className='navbar-collapse collapse w-100 order-3 dual-collapse2'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Create Meme
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
