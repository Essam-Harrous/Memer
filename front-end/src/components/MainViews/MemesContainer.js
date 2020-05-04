import React from 'react';

import Meme from './Meme';

const MemesContainer = () => {
  return (
    <main className='col-md-6 my-3 ml-md-5 mx-auto bd-content'>
      <Meme />
      <Meme />
      <Meme />
    </main>
  );
};
export default MemesContainer;
