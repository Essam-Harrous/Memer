import React from 'react';

//helper funcs
import { getTimeToShow } from '../../helperFunc';

const NotificationCard = ({ notification }) => {
  //render meme
  const renderMeme = () => {
    return (
      <div className='card-body'>
        <div className='text-right mb-3'>{notification.meme.content}</div>
        <div>
          <img
            className='card-img-top'
            alt=''
            src={notification.meme.memeUrl}
          />
        </div>
      </div>
    );
  };

  //render notification body
  const renderNotificationBody = () => {
    switch (notification.type) {
      case 'like':
        return (
          <div className='d-flex'>
            <h5>تفاعل مع هذا الميمز</h5>
            <i className='far fa-2x fa-grin-tears orange-text mr-auto'></i>
          </div>
        );
      case 'disLike':
        return (
          <div className='d-flex'>
            <h5>تفاعل مع هذا الميمز</h5>
            <i className='far fa-2x fa-frown orange-text mr-auto'></i>
          </div>
        );
      case 'comment':
        return (
          <div className='d-flex'>
            <h5>علق على هذا الميمز</h5>
            <i className='far fa-2x fa-comment orange-text mr-auto'></i>
          </div>
        );
    }
  };
  return (
    <>
      <div className='media text-right rtl my-4'>
        <img
          className='d-flex avatar ml-3 rounded-circle'
          src={notification.sender.avatar}
          alt='Generic placeholder image'
        />

        <div className='media-body card p-2 '>
          <div className='d-flex'>
            <div className='d-inline-flex'>
              <h5 className='font-weight-bold ml-2'>
                {notification.sender.firstName +
                  ' ' +
                  notification.sender.lastName}
              </h5>
              <em>{notification.sender.username}@</em>
            </div>
            <div className='text-left mr-auto d-inline-flex'>
              <small>{getTimeToShow(notification.id)}</small>
              <i class='fas fa-ellipsis-h mr-2'></i>
            </div>
          </div>
          {renderNotificationBody()}
          {renderMeme()}
        </div>
      </div>
      <hr />
    </>
  );
};

export default NotificationCard;
