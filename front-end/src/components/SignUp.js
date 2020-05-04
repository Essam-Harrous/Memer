import React from 'react';

const SignUp = () => {
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
            <h4 className='modal-title w-100 text-right'>النشر</h4>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <form>
            <div className='modal-body text-right'>..</div>
            <div className='modal-footer'>
              <button className='btn btn-secondary btn-md' data-dismiss='modal'>
                إلغاء
              </button>
              <button type='submit' className='btn btn-primary btn-md'>
                نشر الميم
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
