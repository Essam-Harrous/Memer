import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import _ from 'lodash';

//actions
import { signUp } from '../../actions';

const SignUp = (props) => {
  //set Loading state with useState()
  const [isLoading, setLoading] = useState(false);

  //yup schema initialization
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, 'الرجاء إدخال 3 خانات على الأقل')
      .required('الرجاء إدخال الإسم الأول'),
    lastName: yup
      .string()
      .min(3, 'الرجاء إدخال 3 خانات على الأقل')
      .required('الرجاء إدخال اللقب '),
    username: yup
      .string()
      .min(3, 'الرجاء إدخال 3 خانات على الأقل')
      .matches(
        /^[a-z0-9-_.]+$/,
        'الرجاء إدخال إسم المستخدم باللغة الإنجليزية و بدون مسافة و بحروف صغيرة'
      )
      .required('الرجاء إدخال إسم المستخدم'),
    email: yup
      .string()
      .email('الرجاء إدخال بريد إلكتروني صحيح')
      .required('الرجاء إدخال البريد الإلكتروني'),
    password: yup
      .string()
      .min(8, 'الرجاء إدخال 8 خانات على الأقل')
      .required('الرجاء إدخال كلمة المرور'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'كلمة المرور غير مطابقة')
      .required('الرجاء تأكيد كلمة المرور'),
  });

  //useformik initialization
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      values.firstName = _.escape(values.firstName);
      values.lastName = _.escape(values.lastName);
      values.email = _.escape(values.email);
      console.log(values);
      props.signUp(values, setLoading);
      setLoading(true);
    },
    validationSchema: schema,
  });

  //modalBody
  const modalBody = () => {
    // setSubmit(false);
    if (!isLoading) {
      return (
        <div className='card-body px-lg-5 pt-0'>
          <form
            onSubmit={formik.handleSubmit}
            className='text-center'
            style={{ color: '#757575' }}
            action='#!'
          >
            <div className='form-row'>
              <div className='col'>
                <div className='md-form'>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name='firstName'
                    type='text'
                    id='materialRegisterFormFirstName'
                    className='form-control'
                    placeholder='الإسم الأول'
                  />
                  {formik.errors.firstName && formik.touched.firstName ? (
                    <div className='alert alert-danger' role='alert'>
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='col'>
                <div className='md-form'>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name='lastName'
                    type='text'
                    id='materialRegisterFormLastName'
                    className='form-control'
                    placeholder='اللقب'
                  />
                  {formik.errors.lastName && formik.touched.lastName ? (
                    <div className='alert alert-danger' role='alert'>
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className='md-form mt-0'>
              <i className='fas fa-at prefix left'></i>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name='username'
                type='text'
                id='materialRegisterFormUsername'
                className='form-control'
                placeholder='إسم المستخدم'
              />
              {formik.errors.username && formik.touched.username ? (
                <div className='alert alert-danger' role='alert'>
                  {formik.errors.username}
                </div>
              ) : null}
              {props.err.signUp && props.err.signUp.username ? (
                <div className='alert alert-danger' role='alert'>
                  {props.err.signUp.username}
                </div>
              ) : null}
            </div>
            <div className='md-form mt-0'>
              <i className='fa fa-envelope prefix left'></i>

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name='email'
                type='email'
                id='materialRegisterFormEmail'
                className='form-control'
                placeholder='البريد الإلكتروني'
              />
              {formik.errors.email && formik.touched.email ? (
                <div className='alert alert-danger' role='alert'>
                  {formik.errors.email}
                </div>
              ) : null}
              {props.err.signUp && props.err.signUp.email ? (
                <div className='alert alert-danger' role='alert'>
                  {props.err.signUp.email}
                </div>
              ) : null}
            </div>

            <div className='md-form'>
              <i className='fa fa-lock prefix left'></i>

              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name='password'
                type='password'
                id='materialRegisterFormPassword'
                className='form-control'
                placeholder='كلمة المرور'
                aria-describedby='materialRegisterFormPasswordHelpBlock'
              />
              {formik.errors.password && formik.touched.password ? (
                <div className='alert alert-danger' role='alert'>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className='md-form'>
              <i className='fa fa-lock prefix left'></i>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name='confirmPassword'
                type='password'
                id='materialRegisterFormPhone'
                className='form-control'
                placeholder='تأكيد كلمة المرور'
                aria-describedby='materialRegisterFormPhoneHelpBlock'
              />
              {formik.errors.confirmPassword &&
              formik.touched.confirmPassword ? (
                <div className='alert alert-danger' role='alert'>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <button
              className='btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0'
              type='submit'
            >
              إنشاء الحساب
            </button>

            <p>أو قم بالتسجيل عن طريق قوقل</p>

            <a type='button' className='btn-floating btn-fb btn-sm'>
              <i className='fab fa-google'></i>
            </a>
            <hr />

            <p>بالضغط على إنشاء الحساب أنت توافق على شروط الخدمة</p>
          </form>
        </div>
      );
    }
    return (
      <div className='mx-auto my-5'>
        <ReactLoading type='spinningBubbles' color='blue' />
      </div>
    );
  };

  return (
    <div
      className='modal fade'
      id='signUp'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='signUp'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-md rtl' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button
              id='close-signUp'
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
                <strong>إنشاء حساب جديد</strong>
              </h5>
              {modalBody()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user, err: state.err };
};
export default connect(mapStateToProps, {
  signUp,
})(SignUp);
