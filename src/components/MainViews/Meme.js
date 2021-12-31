import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//helper functions
import { getTimeToShow } from '../../helperFunc';

import {
  addLike,
  removeLike,
  addDisLike,
  removeDisLike,
  selectMeme,
} from '../../actions';

const Meme = (props) => {
  //likes and disLikes user state
  const [state, setState] = useState({
    isLiked: false,
    isDisLiked: false,
  });

  const likeCssClass = `far fa-2x fa-grin-tears ${
    state.isLiked ? 'orange-text' : ''
  }`;
  const disLikeCssClass = `far fa-2x fa-frown ${
    state.isDisLiked ? 'orange-text' : ''
  }`;

  //using use effect to change the like and disLike user state
  useEffect(() => {
    console.log(props.meme.peopleLikes, 'inside use effect');
    if (props.meme.peopleLikes.indexOf(props.user.id) >= 0) {
      if (!state.isLiked) {
        setState({
          isLiked: true,
          isDisLiked: false,
        });
      }
    } else if (props.meme.peopleDisLikes.indexOf(props.user.id) >= 0) {
      if (!state.isDisLiked) {
        setState({
          isLiked: false,
          isDisLiked: true,
        });
      }
    } else if (state.isDisLiked || state.isLiked) {
      setState({
        isLiked: false,
        isDisLiked: false,
      });
    }

    if (!props.user.id && (state.isLiked || state.isDisLiked)) {
      setState({
        isLiked: false,
        isDisLiked: false,
      });
    }
  }, [props.meme.peopleLikes, props.meme.peopleDisLikes, props.user.id]);

  const handleLike = () => {
    if (props.user.id) {
      if (!state.isLiked) {
        if (state.isDisLiked) props.removeDisLike(props.meme, props.user.id);
        props.addLike(props.meme, props.user.id);
        setState({ isDisLiked: false, isLiked: true });
      } else {
        props.removeLike(props.meme, props.user.id);
        setState({ isDisLiked: false, isLiked: false });
      }
    } else {
      alert('تحتاج تسجيل الدخول أو إنشاء حساب جديد لإستخدام هذه الميزة');
    }
  };

  const handleDisLike = () => {
    if (props.user.id) {
      if (!state.isDisLiked) {
        if (state.isLiked) props.removeLike(props.meme, props.user.id);
        props.addDisLike(props.meme, props.user.id);
        console.log(props.meme.peopleLikes, 'outside use effect');
        setState({ isDisLiked: true, isLiked: false });
      } else {
        props.removeDisLike(props.meme, props.user.id);
        setState({ isDisLiked: false, isLiked: false });
      }
    } else {
      alert('تحتاج تسجيل الدخول أو إنشاء حساب جديد لإستخدام هذه الميزة');
    }
  };

  //return the meme component
  return (
    <div id='meme-container' className='bg-white my-5 mx-auto'>
      <div className='px-3 pt-2'>
        <div className='media text-right rtl'>
          <img
            className='d-flex ml-3 rounded-circle'
            src={props.meme.user.avatar}
            alt='Generic placeholder image'
          />
          <div className='media-body mt-2 d-inline-flex'>
            <h5 className='font-weight-bold ml-2'>
              {props.meme.user.firstName + ' ' + props.meme.user.lastName}
            </h5>
            <em>{props.meme.user.username}@</em>
          </div>
          <div className='text-left mt-2 d-inline-flex'>
            <small>{getTimeToShow(props.meme.id)}</small>
            <div className='dropdown'>
              <a
                className='mr-2'
                type='button'
                data-toggle='dropdown'
                aria-haspopup='true'
              >
                <i className='fas fa-angle-down'></i>
              </a>
              <div className='dropdown-menu' aria-labelledby='dropdownMenu4'>
                <a className='dropdown-item' href='#'>
                  إنشاء ميمز بإستخدام نفس القالب
                </a>
                {props.meme.user.id === props.user.id ? (
                  <>
                    <div className='dropdown-divider'></div>
                    <a className='dropdown-item' href='#'>
                      حذف
                    </a>
                    <a className='dropdown-item' href='#'>
                      تعديل
                    </a>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card-body'>
        <div className='text-right mb-3'>{props.meme.content}</div>
        <div id={`${props.meme.id}`}>
          <img className='card-img-top' alt='' src={props.meme.memeUrl} />
        </div>
        <div className='d-flex justify-content-around mt-3'>
          <a type='button'>
            <i className='fas fa-2x fa-share-alt'></i>
          </a>
          <a type='button' onClick={handleDisLike}>
            <i className={disLikeCssClass}>
              &nbsp;{props.meme.peopleDisLikes.length}
            </i>
          </a>
          <a type='button' onClick={handleLike}>
            <i className={likeCssClass}>
              &nbsp;{props.meme.peopleLikes.length}
            </i>
          </a>
          <a
            onClick={() => props.selectMeme(props.meme)}
            type='button'
            data-toggle='modal'
            data-target='#commentsContainer'
          >
            <i className='far fa-2x fa-comment'>
              &nbsp;{props.meme.comments.length}
            </i>
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state, 'redux state inside the meme component');
  return { user: state.user };
};
export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addDisLike,
  removeDisLike,
  selectMeme,
})(Meme);
