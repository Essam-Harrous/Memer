import React, { createRef, useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
import ReactLoading from 'react-loading';

//helper funcs
import { getTimeToShow } from '../../helperFunc';

//actions
import { addComment } from '../../actions';

const Comments = (props) => {
  //loading state
  const [isLoading, setLoading] = useState(false);

  //refrance for the textarea input
  const contentRef = createRef();

  //formik initialization
  const fromik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: ({ content }) => {
      setLoading(true);
      props.addComment(
        {
          content: _.escape(content),
          receiverId: props.currentMeme.user.id,
          memeId: props.currentMeme.id,
        },
        setLoading
      );
      contentRef.current.value = '';
    },
  });

  //render add comment or add coment placeholder
  const renderAddComment = () => {
    if (isLoading) {
      return (
        <div className='card'>
          <div className='mx-auto'>
            <ReactLoading type='spinningBubbles' color='blue' />
          </div>
        </div>
      );
    } else if (props.user.id) {
      return (
        <div className='media text-right rtl mt-3'>
          <img
            className='d-flex m-2 avatar rounded-circle'
            src={props.user.avatar}
            alt='Generic placeholder image'
          />

          <div className='media-body m-2 card p-2 '>
            <div className='d-flex'>
              <div className='d-inline-flex'>
                <h5 className='font-weight-bold ml-2'>
                  {props.user.firstName + ' ' + props.user.lastName}
                </h5>
                <em>{props.user.username}@</em>
              </div>
            </div>
            <form onSubmit={fromik.handleSubmit} class='form-group d-flex'>
              <textarea
                class='form-control'
                id='exampleFormControlTextarea1'
                rows='2'
                ref={contentRef}
                name='content'
                onChange={fromik.handleChange}
                placeholder='أكتب تعليق...'
              ></textarea>
              <button type='submit box-shadow-unset' className='px-1 btn'>
                <i class='far fa-2x fa-paper-plane'></i>
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className='media text-right rtl mt-3'>
          <div className='alert alert-info mx-auto' role='alert'>
            قم تسجيل الدخول أو قم بإنشاء حساب جديد لتتمكن من التعليق
          </div>
        </div>
      );
    }
  };

  //render the comments body
  const renderComments = () => {
    if (props.currentMeme.comments && props.currentMeme.comments.length) {
      return props.currentMeme.comments.map((comment, i) => {
        return (
          <div className='media text-right rtl mt-3'>
            <img
              className='d-flex ml-3 avatar rounded-circle'
              src={comment.user.avatar}
              alt='Generic placeholder image'
            />

            <div className='media-body card p-2 '>
              <div className='d-flex'>
                <div className='d-inline-flex'>
                  <h5 className='font-weight-bold ml-2'>
                    {comment.user.firstName + ' ' + comment.user.lastName}
                  </h5>
                  <em>{comment.user.username}@</em>
                </div>
                <div className='text-left mr-auto d-inline-flex'>
                  <small>{getTimeToShow(comment.id)}</small>
                  <i class='fas fa-ellipsis-h mr-2'></i>
                </div>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className='alert alert-primary mx-auto text-center'>
          لا يوجد تعليقات حتى الآن
        </div>
      );
    }
  };

  //return the component
  return (
    <div
      className='modal fade'
      id='commentsContainer'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='myModalLabel'
      aria-hidden='true'
    >
      {console.log(props.currentMeme)}
      <div className='modal-dialog modal-lg rtl' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title w-100 text-right' id='myModalLabel'>
              التعليقات
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
          <div className='modal-body comment-body'>{renderComments()}</div>
          <div>{renderAddComment()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentMeme: state.currentMeme, user: state.user };
};
export default connect(mapStateToProps, {
  addComment,
})(Comments);
