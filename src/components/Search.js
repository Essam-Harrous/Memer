import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTags, fetchCustomMemes } from '../actions';
import { useFormik } from 'formik';

const Search = (props) => {
  useEffect(() => {
    props.fetchTags();
  }, []);

  const strToArr = (str) => {
    return str.split(' ');
  };

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: ({ content }) => {
      console.log(content);
      props.fetchCustomMemes(strToArr(content));
    },
  });

  const renderTags = () => {
    if (props.tags.length) {
      return props.tags.map((tag) => {
        return (
          <button
            onClick={() => props.fetchCustomMemes([tag])}
            className='m-2 btn p-1 box-shadow-unset tags'
          >
            {tag}
          </button>
        );
      });
    } else {
      return (
        <div className='mx-auto my-5'>
          <ReactLoading
            className='mx-auto my-5'
            type='spinningBubbles'
            color='blue'
          />
        </div>
      );
    }
  };

  return (
    <div className='d-none d-md-block py-3 ml-md-3 col-md-2 col-xl-3 bd-toc'>
      <div className='card'>
        <div>Search</div>
        <form
          onSubmit={formik.handleSubmit}
          className='form-inline d-flex justify-content-center md-form form-sm mt-0 mb-1'
        >
          <button className='px-1 btn box-shadow-unset' type='submit'>
            <i className='fas fa-search' aria-hidden='true'></i>
          </button>
          <input
            name='content'
            onChange={formik.handleChange}
            className='form-control form-control-sm ml-3 w-75 text-right'
            type='text'
            placeholder='البحث'
            aria-label='Search'
          />
        </form>
        <p className='text-right mx-3 mb-1 mt-3'>
          البحث بإستخدام الكلمات الدلالية الأكثر إستخداما
        </p>
        <div
          className='mx-3 mb-3 mt-0'
          style={{ border: '1px solid #dfe1e5', borderRadius: '4px' }}
        >
          {renderTags()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { tags: state.tags };
};
export default connect(mapStateToProps, {
  fetchTags,
  fetchCustomMemes,
})(Search);
