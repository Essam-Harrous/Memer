import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';

import { logIn } from '../../actions';

const SignIn = (props) => {
  //yup initialization
  const schema = yup.object().shape({
    usernameEmail: yup.string().required('required'),
    password: yup.string().required('required'),
  });

  //formik intialization
  const formik = useFormik({
    initialValues: {
      usernameEmail: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values, 'submit');
      if (values.usernameEmail.includes('@')) {
        props.logIn({
          password: values.password,
          usernameEmail: `email: "${values.usernameEmail}"`,
        });
      } else {
        props.logIn({
          password: values.password,
          usernameEmail: `username: "${values.usernameEmail}"`,
        });
      }
    },
    validationSchema: () => schema,
  });
  return (
    <div
      className='modal fade'
      id='signIn'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='signIn'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-md rtl' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            {/* <h4 className='modal-title w-100 text-right'>النشر</h4> */}
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='card'>
              <h5 className='card-header info-color white-text text-center py-4'>
                <strong>تسجيل الدخول</strong>
              </h5>

              <div className='card-body px-lg-5 pt-0'>
                <form
                  onSubmit={formik.handleSubmit}
                  style={{ color: '#757575' }}
                  action='#!'
                >
                  <div className='md-form'>
                    <i className='fa fa-envelope left prefix'></i>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name='usernameEmail'
                      type='text'
                      id='usernameEmail'
                      className='form-control'
                      placeholder='البريد الإلكتروني أو إسم المستخدم'
                    />

                    {formik.errors.usernameEmail &&
                    formik.touched.usernameEmail ? (
                      <div className='alert alert-danger' role='alert'>
                        أرجاء إدخال البريد الإلكتروني أو إسم المستخدم
                      </div>
                    ) : null}
                  </div>

                  <div className='md-form'>
                    <i className='fa fa-lock left prefix'></i>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name='password'
                      type='password'
                      id='password'
                      className='form-control'
                      placeholder='كلمة المرور'
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <div className='alert alert-danger' role='alert'>
                        أرجاء إدخال كلمة المرور
                      </div>
                    ) : null}
                  </div>
                  {props.user.errMessage ? (
                    <div className='alert alert-danger' role='alert'>
                      {props.user.errMessage}
                    </div>
                  ) : null}
                  <button
                    className='btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0'
                    type='submit'
                  >
                    Sign in
                  </button>
                  <div className='text-center'>
                    <p>أو قم بالتسجيل بواسطة جوجل</p>
                    <a type='button' className='btn-floating btn-git btn-sm'>
                      <i className='fab fa-google'></i>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div className='modal-footer'>
              <button className='btn btn-secondary btn-md' data-dismiss='modal'>
                إلغاء
              </button>
              <button type='submit' className='btn btn-primary btn-md'>
                نشر الميم
              </button>
            </div> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, {
  logIn,
})(SignIn);
