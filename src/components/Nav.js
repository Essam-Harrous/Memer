import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../actions';

const Nav = (props) => {
  //isLogIn variable
  const isLoggedIn = props.user.token ? true : false;

  //handleLogOut
  const handleLogOut = () => {
    //I used setTimeout as a tempararury solution to
    //avoid the click on the element signIn behind the logOut element
    setTimeout(() => {
      props.logOut();
    }, 50);
  };

  //return either logOut component or signIn signUp component
  const LogInOrOut = () => {
    if (isLoggedIn) {
      return (
        <li className='nav-item'>
          <Link onClick={handleLogOut} to='#' className='nav-link'>
            تسجيل الخروج
          </Link>
        </li>
      );
    }
    return (
      <>
        <li className='nav-item'>
          <Link
            to='#'
            data-toggle='modal'
            data-target='#signIn'
            className='nav-link'
          >
            تسجيل الدخول
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='#'
            data-toggle='modal'
            data-target='#signUp'
            className='nav-link'
          >
            إنشاء حساب
          </Link>
        </li>
      </>
    );
  };
  return (
    <nav id="nav-shadow" className='navbar navbar-expand-md bg-white sticky-top'>
      <div className='navbar-collapse collapse w-100 order-1 order-md-0 '>
        <ul className='navbar-nav mr-auto'>{LogInOrOut()}</ul>
      </div>
      <div className='mx-auto order-0'>
        <Link to='/' className='navbar-brand mx-auto'>
          <img src='https://www.dropbox.com/s/p966o311gd6u9wd/rsz_1rsz_11rsz_1rsz_memer_n1ozxp.png?raw=1' />
        </Link>
      </div>
      <button
        style={{
          position: 'absolute',
          right: '0px',
        }}
        type='button'
        id='sidebarCollapse'
        className='navbar-toggler'
      >
        <i className='fas fa-align-right'></i>
      </button>
      <div className='navbar-collapse collapse w-100 order-3 dual-collapse2'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/templates'>
              إنشاء ميمز جديد
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              data-toggle='modal'
              data-target='#addTemplate'
              className='nav-link'
              to='#'
            >
              إضافة قالب ميمز
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { logOut })(Nav);
