import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import history from '../history';

//components
import Nav from './Nav';
import SlideBar from './SlideBar';
import MemesContainer from './MainViews/MemesContainer';
import Editor from './MainViews/Editor';
import SignIn from './Models/SignIn';
import SignUp from './Models/SignUp';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Nav />
        <SignIn />
        <SignUp />
        <div className='container-fluid'>
          <div className='row mt-5'>
            <nav className='d-none d-xl-block py-3 ml-md-3 col-xl-2 bd-toc'>
              <div className='card'>
                <div>hi</div>
                <div>hi</div>
                <div>hi</div>
                <div>hi</div>
                <div>hi</div>
              </div>
            </nav>
            <Switch>
              <Route path='/' exact component={MemesContainer} />
              <Route path='/editor' exact component={Editor} />
            </Switch>
            <SlideBar />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
