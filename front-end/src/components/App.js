import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import history from '../history';

//components
import Nav from './Nav';
import SlideBar from './SlideBar';
import MemesContainer from './MainViews/MemesContainer';
import TemplatesContainer from './MainViews/TemplatesContainer';
import Editor from './MainViews/Editor';
import SignIn from './Modals/SignIn';
import SignUp from './Modals/SignUp';
import AddTemplate from './Modals/AddTemplate';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Nav />
        <SignIn />
        <SignUp />
        <AddTemplate />
        <div id='body' className='container-fluid'>
          <div className='row mt-5'>
            <nav className='d-none d-xl-block py-3 ml-md-3 col-xl-2 bd-toc'>
              <div className='card'>
                <div>Search</div>
                <form className='form-inline d-flex justify-content-center md-form form-sm mt-0 mb-1'>
                  <i className='fas fa-search' aria-hidden='true'></i>
                  <input
                    className='form-control form-control-sm ml-3 w-75 text-right'
                    type='text'
                    placeholder='البحث'
                    aria-label='Search'
                  />
                </form>
              </div>
            </nav>
            <Switch>
              <Route path='/' exact component={MemesContainer} />
              <Route path='/editor/:id' exact component={Editor} />
              <Route path='/templates' exact component={TemplatesContainer} />
            </Switch>
            <SlideBar />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
