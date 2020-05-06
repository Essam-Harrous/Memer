import React from 'react';
import { Link } from 'react-router-dom';

const SlideBar = () => {
  return (
    <nav id='sidebar'>
      <div className='sidebar-header mt-3'>
        <div className='media text-right rtl'>
          <img
            className='d-flex ml-3 rounded-circle'
            src='https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg'
            alt='Generic placeholder image'
          />
          <div className='media-body mt-2'>
            <h5 className='font-weight-bold'>عصام هروس</h5>
            <small>إسم المستخدم: esso@</small>
          </div>
        </div>
      </div>

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
          <li>
            <Link to='/editor' className='btn btn-primary btn-sm w-100 rounded'>
              إنشاء حساب
            </Link>
          </li>
          <li>
            <Link to='/editor' className='btn btn-primary btn-sm w-100 rounded'>
              تسجيل الدخول
            </Link>
          </li>
          <div className='d-flex justify-content-around'>
            <Link to='/editor' className='btn btn-primary btn-sm w-80 rounded'>
              إنشاء ميمز جديد
            </Link>
            <Link to='/editor' className='btn btn-primary btn-sm w-80 rounded'>
              إضافة قالب ميمز
            </Link>
          </div>
        </div>
        <li className='active'>
          <a
            href='#homeSubmenu'
            data-toggle='collapse'
            aria-expanded='false'
            className='dropdown-toggle'
          >
            ميمز / Memes
          </a>
          <ul className='collapse list-unstyled' id='homeSubmenu'>
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
          <a href='#'>المفضلة</a>
        </li>
        <li>
          <a href='#'>ميمز قمت بإنشاءها</a>
        </li>
        <li>
          <a href='#'>الإشعارات</a>
        </li>
        <li>
          <a href='#'>تطبيق الموبايل</a>
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
    </nav>
  );
};
export default SlideBar;
