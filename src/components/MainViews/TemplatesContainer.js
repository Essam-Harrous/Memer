import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//actions
import { getTemplates } from '../../actions';

//component
import Template from './Template';
import ReactLoading from 'react-loading';

const TemplatesContainer = (props) => {
  //using useEffect to call getTemplates action
  useEffect(() => {
    if (!props.templates.length) {
      console.log('inside effect');
      props.getTemplates();
    }
  });

  //it checks if the templates are exist it will loop on them and return Template component
  //if they aren't exist it will return a loader
  const renderTemplates = () => {
    console.log(props.templates);

    if (props.templates.length) {
      return (
        <div className='image-list'>
          {props.templates.map((template, i) => {
            return <Template key={i} template={template} />;
          })}
        </div>
      );
    }
    return (
      <div className='mx-auto my-5'>
        <ReactLoading className='mx-auto' type='spinningBubbles' color='blue' />
      </div>
    );
  };
  return (
    <main className='col-md-6 my-3 mx-auto bd-content'>
      <h1 className='text-center'>إختر قالب ميمز</h1>
      {renderTemplates()}
    </main>
  );
};

const mapStateToProps = (state) => {
  return { templates: state.templates };
};
export default connect(mapStateToProps, {
  getTemplates,
})(TemplatesContainer);
