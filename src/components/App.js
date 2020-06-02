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
import Notifications from './MainViews/Notifications';
import MyMemes from './MainViews/MyMemes';
import CustomMemes from './MainViews/CustomMemes';
import Search from './Search';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Nav />
        <SignIn />
        <SignUp />
        <AddTemplate />
        <div id='body' className='container-fluid'>
          <div className='row'>
            <Search />
            <Switch>
              <Route path='/' exact component={MemesContainer} />
              <Route path='/editor/:id' exact component={Editor} />
              <Route path='/templates' exact component={TemplatesContainer} />
              <Route path='/notifications' exact component={Notifications} />
              <Route path='/myMemes' exact component={MyMemes} />
              <Route path='/customMemes' exact component={CustomMemes} />
            </Switch>
            <SlideBar />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
