import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Register from './components/auth/Register'
import Publish from './components/profile/Publish'
import Createpublish from './components/profile/PublishForm'
import Oauth from './components/auth/Oauth'
import Author from './components/profile/Author'
import Authenticated from './components/auth/Authenticated'
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './components/utils/setAuthToken'
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute'

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App =() => {
  useEffect(() =>{
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing}/>
          <section className="container">
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/publish' component={Publish}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/oauth' component={Oauth}/>
            <PrivateRoute exact path='/authenticated' component={Authenticated}/>
            <PrivateRoute exact path='/createpublish' component={Createpublish}/>
            <PrivateRoute exact path='/author' component={Author}/>
          </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
