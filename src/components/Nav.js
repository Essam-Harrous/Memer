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
    <nav className='navbar navbar-expand-xl navbar-dark bg-dark fixed-top'>
      <div className='navbar-collapse collapse w-100 order-1 order-md-0 '>
        <ul className='navbar-nav mr-auto'>{LogInOrOut()}</ul>
      </div>
      <div className='mx-auto order-0'>
        <Link to='/' className='navbar-brand mx-auto'>
          <img src='https://picresize.com/popup.html?images/rsz_1memer_n1ozxp.png' />
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
