import React, { useState } from 'react';
import { connect } from 'react-redux';
import Tags from '@yaireo/tagify/dist/react.tagify';
import { useFormik } from 'formik';
//Main component
const PostSaveMeme = (props) => {
  const [isPostMeme, setPostMeme] = useState(false);
  const [tags, setTags] = useState([]);

  // Tagify settings object
  const baseTagifySettings = {
    blacklist: ['xxx', 'yyy', 'zzz'],
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
          return obj.value;
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
    onSubmit: (values) => {
      const memeData = {
        ...values,
        tags,
        memeUrl: props.saveMeme.memeUrl,
      };
      console.log(memeData);
    },
  });

  //save meme
  const saveMeme = () => {
    return (
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title w-100 text-right' id='save-meme'>
            التنزيل/النشر
          </h4>
          <button
            type='button'
            className='close'
            data-dismiss='modal'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='modal-body text-right'>
          <h2>تم تعديل الصورة بنجاح.</h2>
          <h4>هل تريد مشاركة الميم معنا؟</h4>
          <img className='card-image w-100' src={props.saveMeme.memeUrl} />
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
            onClick={() => setPostMeme(true)}
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
    return (
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title w-100 text-right' id='save-meme'>
            النشر
          </h4>
          <button
            type='button'
            className='close'
            data-dismiss='modal'
            aria-label='Close'
            onClick={() => setPostMeme(false)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='modal-body text-right'>
            <div className='form-group'>
              <label htmlFor='tags'>كلمات مفتاحية*</label>
              <Tags id='tags' value='مثال' settings={baseTagifySettings} />
              <small>
                <em>إضغط enter لإضافة كلمة أخرة</em>
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
              onClick={() => setPostMeme(false)}
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
        {isPostMeme ? postMeme() : saveMeme()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { saveMeme: state.saveMeme };
};
export default connect(mapStateToProps)(PostSaveMeme);
