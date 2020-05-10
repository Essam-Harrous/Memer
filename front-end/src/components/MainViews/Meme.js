import React from 'react';

const Meme = (props) => {
  return (
    <div id='meme-container' className='card my-5 mx-auto'>
      <div className='card-header'>
        <div className='media text-right rtl'>
          <img
            className='d-flex ml-3 rounded-circle'
            src='https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg'
            alt='Generic placeholder image'
          />
          <div className='media-body mt-2'>
            <div className='font-weight-bold'>
              {props.meme.user.firstName + ' ' + props.meme.user.lastName}
            </div>
            <small>إسم المستخدم: {props.meme.user.username}@</small>
          </div>
          <div className='text-left'>
            <h5 className='font-weight-bold'>...</h5>
            <small>2020/5/19</small>
          </div>
        </div>
      </div>
      <div className='card-body'>
        <div className='text-right mb-3'>{props.meme.content}</div>
        <div>
          <img className='card-img-top' alt='' src={props.meme.memeUrl} />
        </div>
        <div className='d-flex justify-content-around mt-3'>
          <a type='button'>
            <i className='fas fa-2x fa-share-alt'></i>
          </a>
          <a type='button'>
            <i className='far fa-2x fa-frown'></i>
          </a>
          <a type='button'>
            <i className='far fa-2x fa-grin-tears'></i>
          </a>
          <a type='button'>
            <i className='far fa-2x fa-comment'></i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Meme;
