import React, { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Template = (props) => {
  const [spans, setSpans] = useState(0);

  // const imgRef = createRef();

  const setSpan = (e) => {
    console.log(e, e.target);
    const height = e.target.clientHeight;
    setSpans(Math.ceil(height / 10));
  };

  // useEffect(() => {
  //   imgRef.current.addEventListener('load', setSpan);
  // });

  return (
    <div className='mx-auto mb-2' style={{ gridRowEnd: `span ${spans}` }}>
      <Link to={`/editor/${props.template.id}`}>
        <img onLoad={setSpan} alt='' src={props.template.templateUrl} />
      </Link>
    </div>
  );
};

export default Template;
