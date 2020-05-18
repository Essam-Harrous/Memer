import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTags } from '../actions';

const Search = (props) => {
  useEffect(() => {
    if (!props.tags.length) props.fetchTags();
  }, [props.tags]);
  return (
    <div className='d-none d-md-block py-3 ml-md-3 col-md-2 col-xl-3 bd-toc'>
      <div className='card'>
        <div>Search</div>
        <form className='form-inline d-flex justify-content-center md-form form-sm mt-0 mb-1'>
          <i className='fas fa-search' aria-hidden='true'></i>
          <input
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
          {props.tags.map((tag) => {
            return (
              <button className='m-2 btn p-1 box-shadow-unset tags'>
                {tag}
              </button>
            );
          })}
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
})(Search);
