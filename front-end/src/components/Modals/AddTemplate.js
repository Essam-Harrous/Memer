import React, { useState, createRef } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import Tags from '@yaireo/tagify/dist/react.tagify';

import { addTemplate } from '../../actions';

const AddTemplate = (props) => {
  //loading state
  const [isLoading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const imageInputField = createRef();

  //formik initialization
  const handleSubmit = (e) => {
    e.preventDefault();

    props.addTemplate(
      {
        imageData: imageInputField.current.files[0],
        tags,
      },
      setLoading
    );
    setLoading(true);
  };

  // Tagify settings object
  const baseTagifySettings = {
    blacklist: ['sex', 'سكس', 'fuck'],
    maxTags: 10,
    minTags: 2,
    backspace: 'edit',
    placeholder: 'أضف كلمات دلالية',
    addTagOnBlur: true,
    transformTag: (tagData) => (tagData.style = '--tag-bg: hsl(282,49%,65%);'),
    dropdown: {
      enabled: 0, // a;ways show suggestions dropdown
    },
    callbacks: {
      blur: (e) => {
        const tagsValues = e.detail.tagify.value.map((obj) => {
          return `"${obj.value}"`;
        });
        setTags(tagsValues);
      },
    },
  };

  //modalBody
  const modalBody = () => {
    // setSubmit(false);
    if (!isLoading) {
      return (
        <div className='card-body px-lg-5 pt-0'>
          <form onSubmit={handleSubmit} style={{ color: '#757575' }}>
            <div className='md-form'>
              <div className='input-group'>
                <div className='custom-file'>
                  <input
                    ref={imageInputField}
                    type='file'
                    className='custom-file-input'
                    id='inputGroupFile01'
                    aria-describedby='inputGroupFileAddon01'
                    accept='image/*'
                  />
                  <label
                    id='file-label'
                    className='custom-file-label'
                    htmlFor='inputGroupFile01'
                  >
                    إختر قالب
                  </label>
                </div>
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='tags'>كلمات مفتاحية*</label>
              <Tags id='tags' value='مثال' settings={baseTagifySettings} />
              <small>
                <em>إضغط enter لإضافة كلمة أخرة</em>
              </small>
            </div>
            {props.err && props.err.addTemplate ? (
              <div className='alert alert-danger' role='alert'>
                {props.err.addTemplate}
              </div>
            ) : null}
            <button
              className='btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0'
              type='submit'
            >
              أضف قالب الميمز
            </button>
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

  //return modal
  return (
    <div
      className='modal fade'
      id='addTemplate'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='addTemplate'
      aria-hidden='true'
    >
      {console.log('addTemplate', props)}
      <div className='modal-dialog modal-md rtl' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            {/* <h4 className='modal-title w-100 text-right'>النشر</h4> */}
            <button
              id='close-addTemplate'
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
                <strong>إضافة قالب ميمز</strong>
              </h5>
              {modalBody()}
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
  return { err: state.err };
};
export default connect(null, {
  addTemplate,
})(AddTemplate);
