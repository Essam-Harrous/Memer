import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkToken } from '../actions';
import { logOut } from '../actions';

const SlideBar = (props) => {
  //handleLogOut
  const handleLogOut = () => {
    //I used setTimeout as a tempararury solution to
    //avoid the click on the element signIn behind the logOut element
    setTimeout(() => {
      props.logOut();
    }, 50);
  };

  //show user info if exist
  const userInfo = () => {
    if (props.user.firstName) {
      return (
        <div className='media text-right rtl'>
          <img
            className='d-flex ml-3 avatar rounded-circle'
            src={props.user.avatar}
            alt='Generic placeholder image'
          />
          <div className='media-body'>
            <h5 className='font-weight-bold mb-0'>
              {props.user.firstName + ' ' + props.user.lastName}
            </h5>
            <small>إسم المستخدم: {props.user.username}@</small>
          </div>
        </div>
      );
    } else if (localStorage.getItem('token')) {
      props.checkToken();
    }
  };

  const renderLogInOrOut = () => {
    if (props.user.token) {
      return (
        <div className='d-flex justify-content-around'>
          <Link
            onClick={handleLogOut}
            to='#'
            className='btn btn-primary btn-sm w-100 rounded'
          >
            تسجيل الخروج
          </Link>
        </div>
      );
    }
    return (
      <div className='d-flex justify-content-around'>
        <Link
          to='#'
          data-toggle='modal'
          data-target='#signUp'
          className='btn btn-primary btn-sm w-100 rounded'
        >
          إنشاء حساب
        </Link>
        <Link
          to='#'
          data-toggle='modal'
          data-target='#signIn'
          className='btn btn-primary btn-sm w-100 rounded'
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  };

  return (
    <nav id='sidebar'>
      <div className='sidebar-header mt-3'>{userInfo()}</div>

      <ul className='list-unstyled components pt-0 text-right'>
        <div className='d-md-none'>
          <form className='form-inline d-flex justify-content-center md-form form-sm mt-0 mb-1'>
            <i className='fas fa-search' aria-hidden='true'></i>
            <input
              className='form-control form-control-sm ml-3 w-75 text-right'
              type='text'
              placeholder='البحث'
              aria-label='Search'
            />
          </form>
          {renderLogInOrOut()}
          <li>
            <Link
              className='btn btn-primary btn-sm w-80 rounded'
              to='/templates'
            >
              إنشاء ميمز جديد
            </Link>
          </li>
          <li>
            <Link
              data-toggle='modal'
              data-target='#addTemplate'
              className='btn btn-primary btn-sm w-80 rounded'
              to='#'
            >
              إضافة قالب ميمز
            </Link>
          </li>
        </div>
        <li>
          <a
            href='#pageSubmenu'
            data-toggle='collapse'
            aria-expanded='false'
            className='dropdown-toggle'
          >
            ميمز / Memes
          </a>
          <ul className='collapse list-unstyled' id='pageSubmenu'>
            <li>
              <a href='#'>آخر ما تم نشره</a>
            </li>
            <li>
              <a href='#'>أفضل ما تم نشره</a>
            </li>
            <li>
              <a href='#'>ميمز الأصدقاء</a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href='#pageSubmenu'
            data-toggle='collapse'
            aria-expanded='false'
            className='dropdown-toggle'
          >
            أفضل الميمرز
          </a>
          <ul className='collapse list-unstyled' id='pageSubmenu'>
            <li>
              <a href='#'>هذا الشهر</a>
            </li>
            <li>
              <a href='#'>هذا الأسبوع</a>
            </li>
            <li>
              <a href='#'>هذه السنة</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#'>ميمز قمت بإنشاءها</a>
        </li>
        <li>
          <Link to='/notifications'>الإشعارات</Link>
        </li>
        <li>
          <a href='#'>تطبيق الموبايل</a>
        </li>
        <li>
          <a href='#'>إعدادات</a>
        </li>
        {/* <li>
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
        </li> */}
      </ul>

      <footer
        style={{ backgroundColor: '#7386d5' }}
        className='page-footer font-small pt-4'
      >
        <div className='container-fluid text-center'>
          <div className='mb-3'>
            <h5 className='text-uppercase'>contact</h5>
            <p className='white-text'>developed by Essam Harous</p>
            <div className='d-flex justify-content-around'>
              <a href='https://web.facebook.com/faragharoos' target='_blank'>
                <i className='fab fa-facebook-f fa-2x'></i>
              </a>
              <a href='https://github.com/Essam-Harrous' target='_blank'>
                <i className='fab fa-2x fa-github'></i>
              </a>
              <a href='https://twitter.com/EssamHarous' target='_blank'>
                <i className='fab fa-2x fa-twitter'></i>
              </a>
            </div>
          </div>
        </div>

        <div className='footer-copyright text-center py-3'>
          © 2020 Copyright: &nbsp;
          <a href='#'>Memer.ly</a>
        </div>
      </footer>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, {
  checkToken,
  logOut,
})(SlideBar);
