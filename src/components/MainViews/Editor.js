import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { request } from 'graphql-request';

import PostSaveMeme from '../Modals/PostSaveMeme';
import ReactLoading from 'react-loading';

import { saveMeme } from '../../actions';

const Editor = (props) => {
  // shouldComponentUpdate() {
  //   return false;
  // }
  //current template State
  const [state, setState] = useState({
    template: null,
    err: null,
    isLoading: false,
  });

  useEffect(() => {
    if (!state.template) getTemplate(props.match.params.id);
    else {
      let template = state.template.templateUrl;
      console.log(template, 'pixie');
      var pixie = new window.Pixie({
        crossOrigin: true,
        watermarkText: 'Memer.ly',
        baseUrl: window.location.origin,
        onLoad: function () {
          window.postMessage('pixieLoaded', '*');
        },
        onSave: async (data, name) => {
          setState({ ...state, isLoading: true });

          //check if the background image has been changed or not
          const pixieState = JSON.parse(pixie.getState());
          const StateImage = pixieState.canvas.objects[0].src;
          const memeData = { memeUrl: data };
          if (StateImage === state.template.templateUrl) {
            memeData.templateId = props.match.params.id;
          } else {
            memeData.templateUrl = StateImage;
          }
          console.log(memeData);
          await props.saveMeme(memeData, setState);
          const modal = document.getElementById('showModal');
          modal.click();

          // pixie
          //   .http()
          //   .post('http://your-site-url.com', { name: name, data: data })
          //   .subscribe(function (response) {
          //     console.log(response);
          //   });
        },
        onMainImageLoaded: (data, a) => {
          console.log(a, 'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        },
        ui: {
          openImageDialog: {
            show: false,
          },
        },
      });
      // pixie.on('load', ()=> {
      //   // pixie.openEditorWithImage(template, true);
      //   pixie.setConfig('image', template)
      // })

      setTimeout(() => {
        pixie.openMainImage(template);
      }, 100);
    }
  });

  //getTemplate from server
  const getTemplate = async (id) => {
    try {
      const query = `{
        template(id: "${id}") {
          templateUrl
          tags
        }
      }`;

      const response = await request(process.env.REACT_APP_SERVER_URL, query);
      console.log(response);
      setState({ template: response.template });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setState({ err: err.response });
    }
  };

  //render editor or loador
  const renderEditor = () => {
    if (state.template && !state.isLoading) {
      return (
        <pixie-editor>
          <div className='global-spinner'>
            <div className='la-ball-spin-clockwise la-2x'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </pixie-editor>
      );
    }
    return (
      <div className='mx-auto my-5'>
        <ReactLoading className='mx-auto' type='spinningBubbles' color='blue' />
      </div>
    );
  };

  return (
    <main className='col-md-5 my-5 py-3 ml-md-5 mx-auto bd-content'>
      <button
        id='showModal'
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target='#save-meme'
        style={{ display: 'none' }}
      >
        Launch demo modal
      </button>
      {renderEditor()}
      <PostSaveMeme />
    </main>
  );
};

export default connect(null, {
  saveMeme,
})(Editor);
