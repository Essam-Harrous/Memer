import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

//actions
import Meme from './Meme';
import Comments from '../Modals/Comments';

const CustomMemes = (props) => {
  //check if memes are exist return them
  //if not return a loader
  const renderMemes = () => {
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
      {!props.memes.length ? (
        <div className='alert alert-info' role='alert'>
          الميمز الذي تبحث عليه غير موجود..
        </div>
      ) : null}
      <Comments />
      <h5>نتائج البحث...</h5>
      {renderMemes()}
    </main>
  );
};

const mapStateToProps = (state) => {
  return { memes: state.memes.customMemes };
};
export default connect(mapStateToProps)(CustomMemes);
