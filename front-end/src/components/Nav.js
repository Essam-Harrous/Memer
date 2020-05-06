import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  //
  const isLoggedIn = props.user.token ? true : false;

  const LogInOrOut = () => {
    if (isLoggedIn) {
      return (
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            Log Out
          </a>
        </li>
      );
    }
    return (
      <>
        <li className='nav-item'>
          <a
            type='button'
            data-toggle='modal'
            data-target='#signIn'
            className='nav-link'
            href='#'
          >
            تسجيل الدخول
          </a>
        </li>
        <li className='nav-item'>
          <a
            type='button'
            data-toggle='modal'
            data-target='#signUp'
            className='nav-link'
            href='#'
          >
            إنشاء حساب
          </a>
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
            <Link className='nav-link' to='/'>
              إنشاء ميمز جديد
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
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
export default connect(mapStateToProps)(Nav);
