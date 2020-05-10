import React, { useState, createRef } from 'react';
import { connect } from 'react-redux';
import Tags from '@yaireo/tagify/dist/react.tagify';
import { useFormik } from 'formik';
import ReactLoading from 'react-loading';
import _ from 'lodash';

//actions
import { addMeme } from '../../actions';

//Main component
const PostSaveMeme = (props) => {
  const [state, setState] = useState({
    isPostMeme: false,
    isLoading: false,
    isSaved: false,
  });
  const [tags, setTags] = useState([]);

  const closeRef = createRef();

  // Tagify settings object
  const baseTagifySettings = {
    blacklist: ['سكس', 'sex', 'fuck'],
    maxTags: 10,
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

  //useformik initialization
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: ({ content }) => {
      if (localStorage.getItem('token')) {
        const memeData = {
          content: _.escapeRegExp(_.escape(content)),
          tags,
          ...props.saveMeme,
        };
        setState({
          isPostMeme: true,
          isLoading: true,
        });
        console.log(memeData);
        props.addMeme(memeData, setState);
      } else {
        alert('أرجاء تسحيل الدخول أو إنشاء حساب جديد لنشر الميم');
      }
    },
  });

  //save meme
  const saveMeme = () => {
    return (
      <div>
        <div className='modal-body text-right'>
          <h2>تم تعديل الصورة بنجاح.</h2>
          <h4>هل تريد مشاركة الميم معنا؟</h4>
          <img
            alt=''
            className='card-image w-100'
            src={props.saveMeme.memeUrl}
          />
        </div>
        <div className='modal-footer'>
          <a
            download
            href={props.saveMeme.memeUrl}
            className='btn btn-secondary btn-md'
            // data-dismiss='modal'
          >
            تنزيل
          </a>
          <button
            onClick={() => setState({ isPostMeme: true })}
            type='button'
            className='btn btn-primary btn-md'
          >
            نشر الميم
          </button>
        </div>
      </div>
    );
  };

  //post Meme
  const postMeme = () => {
    if (!state.isLoading) {
      return (
        <form onSubmit={formik.handleSubmit}>
          <div className='modal-body text-right'>
            <div className='form-group'>
              <label htmlFor='tags'>كلمات مفتاحية*</label>
              <Tags id='tags' value='مثال' settings={baseTagifySettings} />
              <small>
                <em>إضغط enter لإضافة كلمة ثانية</em>
              </small>
            </div>
            <div className='form-group'>
              <label htmlFor='content'>محتوى</label>
              <textarea
                className='form-control'
                id='content'
                rows='3'
                id='content'
                placeholder='أكتب تعليقا ما'
                onChange={formik.handleChange}
              ></textarea>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              id='close-meme'
              onClick={() => setState({ isPostMeme: false })}
              className='btn btn-secondary btn-md'
              data-dismiss='modal'
            >
              إلغاء
            </button>
            <button type='submit' className='btn btn-primary btn-md'>
              نشر الميم
            </button>
          </div>
        </form>
      );
    }
    if (state.isSaved) {
      setTimeout(() => {
        console.log(closeRef, closeRef.current);
        closeRef.current.click();
        setState({
          isLoading: false,
          isPostMeme: false,
          isSaved: false,
        });
      }, 2000);
      return (
        <div className='mx-auto'>
          <i class='far fa-10x green-text fa-check-circle'></i>
          <div className='alert alert-success' role='alert'>
            تم نشر الميمز بنجاح
          </div>
        </div>
      );
    }
    return (
      <div className='mx-auto my-5'>
        <ReactLoading className='mx-auto' type='spinningBubbles' color='blue' />
      </div>
    );
  };

  return (
    <div
      className='modal fade'
      id='save-meme'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='save-meme'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-md rtl' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title w-100 text-right' id='save-meme'>
              التنزيل/النشر
            </h4>
            <button
              ref={closeRef}
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          {state.isPostMeme ? postMeme() : saveMeme()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { saveMeme: state.saveMeme };
};
export default connect(mapStateToProps, {
  addMeme,
})(PostSaveMeme);
