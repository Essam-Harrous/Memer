import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import NotificationCard from './NotificationCard';

import { fetchNotifications } from '../../actions';

const Notifications = (props) => {
  //using use effect to request the notification from the server
  useEffect(() => {
    props.fetchNotifications();
    if (!props.user.id) {
      return <Redirect to='/' />;
    }
  }, []);

  //render notifications
  const renderNotifications = () => {
    console.log(props.notifications);
    if (props.notifications && props.notifications.length) {
      return props.notifications.map((notification, i) => {
        return <NotificationCard notification={notification} />;
      });
    } else if (props.notifications) {
      return (
        <div className='alert alert-info' role='alert'>
          لا يوجد أي إشعارات حتى الآن
        </div>
      );
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

  //return main component
  return (
    <main className='col-md-6 my-3 ml-md-5 mx-auto bd-content'>
      <div>Notifications</div>
      {renderNotifications()}
    </main>
  );
};

const mapStateToProps = (state) => {
  return { notifications: state.notify.notifications, user: state.user };
};
export default connect(mapStateToProps, {
  fetchNotifications,
})(Notifications);
