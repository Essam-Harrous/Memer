import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostSaveMeme from './PostSaveMeme';
import { saveMeme } from '../actions';

class Editor extends Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    const props = this.props;
    let template =
      'https://res.cloudinary.com/essam/image/upload/v1588391021/yi04n2hcb8brengcpcdc.jpg';
    var pixie = new window.Pixie({
      crossOrigin: true,
      watermarkText: 'Pixie Demo',
      baseUrl: 'http://localhost:3000',
      image: template,
      onLoad: function () {
        window.postMessage('pixieLoaded', '*');
      },
      onSave: function (data, name) {
        props.saveMeme({ memeUrl: data });
        const modal = document.getElementById('showModal');
        modal.click();
        // pixie
        //   .http()
        //   .post('http://your-site-url.com', { name: name, data: data })
        //   .subscribe(function (response) {
        //     console.log(response);
        //   });
      },
      ui: {
        openImageDialog: {
          show: false,
        },
      },
    });
  }

  render() {
    return (
      <main className='col-md-7 my-5 py-3 ml-md-5 mx-auto bd-content'>
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
          {setTimeout(function () {
            var spinner = document.querySelector('.global-spinner');
            if (spinner) spinner.style.display = 'flex';
          }, 50)}
        </pixie-editor>
        <PostSaveMeme />
      </main>
    );
  }
}
export default connect(null, {
  saveMeme,
})(Editor);
