import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';

//actions
import { fetchMyMemes } from '../../actions';

import Meme from './Meme';
import Comments from '../Modals/Comments';

const MyMemes = (props) => {
  //use useEffect to request the memes list from the server
  useEffect(() => {
    if (!props.memes.length) props.fetchMyMemes();
  });

  //check if memes are exist return them
  //if not return a loader
  const renderMemes = () => {
    if (!props.user.id) {
      return <Redirect to='/' />;
    }
    if (props.memes.length) {
      return props.memes.map((meme, i) => {
        return <Meme key={i} meme={meme} />;
      });
    } else {
      return (
        <div className='mx-auto my-5'>
          <ReactLoading
            className='mx-auto'
            type='spinningBubbles'
            color='blue'
          />
        </div>
      );
    }
  };
  console.log(props);
  return (
    <main className='col-md-6 my-3 mx-auto bd-content'>
      <Comments />
      <h5>الميمز اللتي قمت بإنشائها</h5>
      {renderMemes()}
    </main>
  );
};

const mapStateToProps = (state) => {
  return { memes: state.memes.myMemes, user: state.user };
};
export default connect(mapStateToProps, {
  fetchMyMemes,
})(MyMemes);
